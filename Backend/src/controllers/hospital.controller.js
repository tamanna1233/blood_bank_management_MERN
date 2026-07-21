import { Hospital } from '../model/hospital.model.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const hospitalRegister = asyncHandler(async (req, res) => {
    const { hospitalName, registrationNumber, email, phone, address, city, contactPerson, password } = req.body;
    console.log(hospitalName, registrationNumber, email, phone, address, city, contactPerson, password)

    // fields are required
    if ([hospitalName, registrationNumber, email, phone, address, city, contactPerson, password].some((field) => !field || field.trim() === "")) {
        throw new apiError(400, "Please fill in all fields");
    }
    
    // check if hospital is already registered
    const existingHospital = await Hospital.findOne({ 
        $or: [{ email }, { registrationNumber }] 
    });
    
    if (existingHospital) {
        throw new apiError(400, "Hospital already registered with this email or registration number");
    }

    // create the hospital
    const newHospital = new Hospital({
        hospitalName,
        registrationNumber,
        email,
        phone,
        address,
        city,
        contactPerson,
        password
    });

    const savedHospital = await newHospital.save();
    
    if (!savedHospital) {
        throw new apiError(500, "Error creating new hospital");
    }
    
    return res.status(201).json(new apiResponse(201, { hospital: savedHospital }, "Hospital is successfully registered and awaiting approval"));
});

const generateAccessAndRefreshTokens = async (hospitalId) => {
    try {
        const hospital = await Hospital.findById(hospitalId);
        const accessToken = hospital.generateAccessToken();
        const refreshToken = hospital.generateRefreshToken();

        hospital.refreshToken = refreshToken;
        await hospital.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new apiError(500, "Something went wrong while generating refresh and access token");
    }
};

const loginHospital = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new apiError(400, "Email and password are required");
    }

    const hospital = await Hospital.findOne({ email });
    if (!hospital) {
        throw new apiError(404, "Hospital not found");
    }

    const isPasswordValid = await hospital.isPasswordcorrect(password);
    if (!isPasswordValid) {
        throw new apiError(401, "Invalid credentials");
    }

    if (hospital.status === "PENDING") {
        throw new apiError(403, "Hospital account is pending admin approval");
    }

    if (hospital.status === "REJECTED") {
        throw new apiError(403, "Hospital account has been rejected");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(hospital._id);
    const loggedInUser = await Hospital.findById(hospital._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new apiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "Hospital logged in successfully"));
});

const logoutHospital = asyncHandler(async (req, res) => {
    await Hospital.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new apiResponse(200, {}, "Hospital logged out successfully"));
});

export { hospitalRegister, loginHospital, logoutHospital };