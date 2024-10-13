import { sendOtp, verifyotp } from "../utils/nodemailer.otp.js";
import { Patient } from "../model/patientschema.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Donor } from "../model/donor.model.js";
import { Location } from "../model/location.model.js";

// Generate access and refresh token
const generateAccessTokenAndRefreshToken = async (userID) => {
  try {
    const patient = await Patient.findById(userID);
    const accessToken = patient.generateAccessToken();
    const refreshToken = patient.generateRefreshToken();
    patient.refreshToken = refreshToken;

    await patient.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(500, error.message);
  }
};

// Step 1: Send OTP for login
const login = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new apiError(400, "Email required");
  }

  let patient = await Patient.findOne({ email });
  try {
    if (!patient) {
      patient = new Patient({ email });
      await patient.save();
    }
  } catch (error) {
    throw new apiError(400, error.message);
  }

  // Send OTP
  const send = await sendOtp(email);
  if (!send) {
    throw new apiError(400, "OTP not sent");
  }

  res.status(200).json(new apiResponse(200, {}, "OTP sent successfully"));
});

// Step 2: Verify OTP for login
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!(email && otp)) {
    throw new apiError(400, "Email and OTP required");
  }

  try {
    // Verify OTP
    await verifyotp(email, otp);

    // Fetch the patient or create a session/token
    let patient = await Patient.findOne({ email });

    if (!patient) {
      throw new apiError(400, "User not found");
    }

    // Generate session tokens
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(patient._id);
    const loggedInUser = await Patient.findById(patient._id).select('-password -refreshToken');
    
    const options = {
      httpOnly: true,
      secure: true,
    };
    
    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(
        new apiResponse(200, {
          user: loggedInUser,
          accessToken,
          refreshToken,
        }, 'User logged in successfully')
      );
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

// Logout Function
const logout = asyncHandler(async (req, res) => {
  await Patient.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      }
    },
    {
      new: true
    }
  );
  
  const options = {
    httpOnly: true,
    secure: true,
  };
  
  return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie('refreshToken', options)
    .json(new apiResponse(200, {}, 'User logged out'));
});

// Match Blood Group Function
const matchBloodGroup = asyncHandler(async (req, res) => {
  function getCompatibleBloodTypes(recipientBloodType) {
    const compatibility = {
      'A_pos': ['A_pos', 'A_neg', 'O_pos', 'O_neg'],
      'A_neg': ['A_neg', 'O_neg'],
      'B_pos': ['B_pos', 'B_neg', 'O_pos', 'O_neg'],
      'B_neg': ['B_neg', 'O_neg'],
      'AB_pos': ['AB_pos', 'AB_neg', 'A_pos', 'A_neg', 'B_neg', 'B_pos', 'O_pos', 'O_neg'],
      'AB_neg': ['AB_neg', 'A_neg', 'B_neg', 'O_neg'],
      'O_pos': ['O_pos', 'O_neg'],
      'O_neg': ['O_neg'],
    };

    return compatibility[recipientBloodType] || 'Invalid blood type';
  }

  const { bloodType, address } = req.body;

  // Log the incoming request
  console.log('Incoming Request:', { bloodType, address });

  const compatibleBloodTypes = getCompatibleBloodTypes(bloodType);
  console.log('Compatible Blood Types:', compatibleBloodTypes);

  if (typeof compatibleBloodTypes === 'string') {
    return res.status(400).json(new apiResponse(400, {}, compatibleBloodTypes));
  }

  try {
    // Step 1: Find matching locations using regex
    const locations = await Location.find({},{ address:1 });
    console.log('Matching Locations:', locations);

    if (locations.length === 0) {
      return res.status(404).json(new apiResponse(404, {}, 'No matching locations found'));
    }

    const locationIds = locations.map(location => location._id);

    // Step 2: Find donors based on matching locations and compatible blood types
    const donors = await Donor.aggregate([
      {
        $match: {
          location: { $in: locationIds } ,// Match donors based on found location IDs
 
        bloodType: { $in: compatibleBloodTypes },
  }
      },
      {
        $lookup: {
          from: "locations", // Name of the Location collection
          localField: "location", // Field in the Donor collection
          foreignField: "_id", // Field in the Location collection
          as: "locationDetails" // Name for the output array
        }
      },
      {
        $unwind: {
          path: "$locationDetails",
          preserveNullAndEmptyArrays: true // Preserve donors without location
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          phone: 1,
          age: 1,
          bloodType: 1,
          address: "$locationDetails.address" // Include address from the location details
        }
      }
    ]);

    console.log('Donors Found:', donors);

    if (donors.length === 0) {
      return res.status(404).json(new apiResponse(404, {}, 'No compatible donors found'));
    }

    return res.status(200).json(new apiResponse(200, { donors }, 'Success'));
  } catch (error) {
    console.error('Error in donor search:', error);
    return res.status(500).json(new apiResponse(500, {}, 'Server error'));
  }
});

export { login, verifyOtp, logout, matchBloodGroup };
