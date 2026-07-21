import mongoose from "mongoose";
import { DonationRequest } from "../model/donationRequestSchema.js";
import { BloodRequest } from "../model/bloodRequest.model.js";
import { BloodInventory } from "../model/bloodInventory.model.js";
import { InventoryTransaction } from "../model/inventoryTransaction.model.js";
import { Donor } from "../model/donor.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

// --- DONOR WORKFLOW ---

export const submitDonationRequest = asyncHandler(async (req, res) => {
  const { requestedBloodType, preferredDate } = req.body;
  const donorId = req.user._id;

  if (!requestedBloodType || !preferredDate) {
    throw new apiError(400, "Blood type and preferred date are required");
  }
  console.log(requestedBloodType);
  const request = await DonationRequest.create({
    donor: donorId,
    requestedBloodType,
    preferredDate,
  });

  return res
    .status(201)
    .json(
      new apiResponse(
        201,
        { request },
        "Donation request submitted successfully",
      ),
    );
});

export const updateDonationStatus = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { status, adminRemark } = req.body;

  const validStatuses = [
    "PENDING",
    "APPROVED",
    "REJECTED",
    "COMPLETED",
    "CANCELLED",
  ];
  if (!validStatuses.includes(status)) {
    throw new apiError(400, "Invalid status");
  }

  const request = await DonationRequest.findById(requestId);
  if (!request) throw new apiError(404, "Donation request not found");

  if (request.status === "COMPLETED") {
    throw new apiError(
      400,
      "Donation is already completed and cannot be changed",
    );
  }
  console.log(status, request.requestedBloodType);

  // If status is APPROVED or COMPLETED, we need to update inventory
  if (["APPROVED", "COMPLETED"].includes(status)) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Update request status
      request.status = status;
      request.adminRemark = adminRemark || request.adminRemark;
      if (status === "COMPLETED" || status === "APPROVED") {
        request.completionDate = new Date();
      }
      await request.save({ session });

      // Update inventory safely
      let inventory = await BloodInventory.findOne({
        bloodGroup: request.requestedBloodType,
      }).session(session);
       console.log(inventory)
      if (!inventory) {
        inventory = new BloodInventory({ bloodGroup: request.requestedBloodType });
      }

      const previousUnits = inventory.availableUnits;
      inventory.availableUnits += 1; // Assuming each donation adds one unit
      inventory.totalDonatedUnits += 1;
      inventory.lastUpdatedBy = req.user._id;
      await inventory.save({ session });

      // Record transaction
      await InventoryTransaction.create(
        [
          {
            bloodGroup: request.requestedBloodType,
            transactionType: "DONATION",
            units: 1,
            previousUnits,
            updatedUnits: inventory.availableUnits,
            referenceId: request._id,
            performedBy: req.user._id,
            remark: `Donation ${status.toLowerCase()}`,
          },
        ],
        { session },
      );

      await session.commitTransaction();
      session.endSession();
    } catch (error) {
    console.log(error)
      await session.abortTransaction();
      session.endSession();
      throw new apiError(
        500,
        error.message || "Failed to update donation status",
      );
    }
  } else {
    // For other statuses like REJECTED or CANCELLED
    request.status = status;
    request.adminRemark = adminRemark;
    await request.save();
  }

  return res
    .status(200)
    .json(new apiResponse(200, { request }, "Donation status updated"));
});

// --- BLOOD REQUEST WORKFLOW ---

export const submitBloodRequest = asyncHandler(async (req, res) => {
  const {
    bloodGroup,
    unitsRequired,
    requiredDate,
    urgency,
    medicalReason,
    patientName,
    patientAge,
    patientGender,
    prescriptionUrl,
  } = req.body;

  // Determine requester
  const isHospital = req.userRole === "hospital"; // Assuming middleware adds this
  const isPatient = req.userRole === "patient";

  if (!isHospital && !isPatient) {
    throw new apiError(403, "Only hospitals and patients can submit requests");
  }

  const request = await BloodRequest.create({
    requesterType: isHospital ? "Hospital" : "Patient",
    hospital: isHospital ? req.user._id : null,
    patient: isPatient ? req.user._id : null,
    bloodGroup,
    unitsRequired,
    requiredDate,
    urgency,
    medicalReason,
    patientName,
    patientAge,
    patientGender,
    prescriptionUrl,
  });

  return res
    .status(201)
    .json(
      new apiResponse(201, { request }, "Blood request submitted successfully"),
    );
});

export const updateBloodRequestStatus = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { status, adminRemark } = req.body;
  // Approving or rejecting, NOT issuing
  const request = await BloodRequest.findById(requestId);
  if (!request) throw new apiError(404, "Blood request not found");

  if (["ISSUED", "COMPLETED"].includes(request.status)) {
    throw new apiError(
      400,
      "Cannot change status of an issued or completed request",
    );
  }

  request.status = status;
  request.adminRemark = adminRemark;
  await request.save();

  return res
    .status(200)
    .json(new apiResponse(200, { request }, "Request status updated"));
});

export const issueBlood = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { adminRemark } = req.body;

  const request = await BloodRequest.findById(requestId);
  if (!request) throw new apiError(404, "Blood request not found");

  if (request.status !== "APPROVED") {
    throw new apiError(400, "Request must be APPROVED before issuing blood");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const inventory = await BloodInventory.findOne({
      bloodGroup: request.bloodGroup,
    }).session(session);
    if (!inventory) throw new Error("Inventory not found");

    if (inventory.availableUnits < request.unitsRequired) {
      throw new Error(
        `Insufficient blood units. Available: ${inventory.availableUnits}, Required: ${request.unitsRequired}`,
      );
    }

    const previousUnits = inventory.availableUnits;
    inventory.availableUnits -= request.unitsRequired;
    inventory.totalIssuedUnits += request.unitsRequired;
    inventory.lastUpdatedBy = req.user._id;
    await inventory.save({ session });

    request.status = "ISSUED";
    request.issuedUnits = request.unitsRequired;
    request.adminRemark = adminRemark || request.adminRemark;
    await request.save({ session });

    await InventoryTransaction.create(
      [
        {
          bloodGroup: request.bloodGroup,
          transactionType: "BLOOD_ISSUE",
          units: request.unitsRequired,
          previousUnits,
          updatedUnits: inventory.availableUnits,
          referenceId: request._id,
          performedBy: req.user._id,
          remark: "Blood Issued",
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new apiError(400, error.message || "Failed to issue blood");
  }

  return res
    .status(200)
    .json(new apiResponse(200, { request }, "Blood issued successfully"));
});

// --- ADMIN GETTERS ---

export const getAllDonationRequests = asyncHandler(async (req, res) => {
  const requests = await DonationRequest.find()
    .populate("donor", "name email phone bloodType address")
    .sort({ createdAt: -1 });
  return res
    .status(200)
    .json(new apiResponse(200, { requests }, "Donation requests fetched"));
});

export const getAllBloodRequests = asyncHandler(async (req, res) => {
  const requests = await BloodRequest.find()
    .populate("patient", "name email age bloodtype")
    .populate("hospital", "hospitalName phone email city")
    .sort({ createdAt: -1 });
  return res
    .status(200)
    .json(new apiResponse(200, { requests }, "Blood requests fetched"));
});

export const getPatientBloodRequests = asyncHandler(async (req, res) => {
  const requests = await BloodRequest.find({ patient: req.user._id })
    .populate("hospital", "hospitalName")
    .sort({ createdAt: -1 });
  return res
    .status(200)
    .json(new apiResponse(200, { requests }, "Patient blood requests fetched"));
});
