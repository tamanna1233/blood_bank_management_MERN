import { model, Schema } from "mongoose";

const bloodRequestSchema = new Schema(
  {
    requesterType: {
      type: String,
      enum: ["Patient", "Hospital"],
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
    bloodGroup: {
      type: String,
      enum: [
        "A_pos",
        "A_neg",
        "B_pos",
        "B_neg",
        "O_pos",
        "O_neg",
        "AB_pos",
        "AB_neg",
      ],
      required: true,
    },
    unitsRequired: {
      type: Number,
      required: true,
      min: 1,
    },
    requiredDate: {
      type: Date,
      required: true,
    },
    urgency: {
      type: String,
      enum: ["NORMAL", "URGENT", "EMERGENCY"],
      default: "NORMAL",
    },
    patientName: { type: String }, // Provided by Hospital if they request for a patient
    patientAge: { type: Number },
    patientGender: { type: String },
    medicalReason: { type: String, required: true },
    prescriptionUrl: { type: String },
    status: {
      type: String,
      enum: [
        "PENDING",
        "APPROVED",
        "REJECTED",
        "ISSUED",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "PENDING",
    },
    adminRemark: { type: String },
    issuedUnits: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const BloodRequest = model("BloodRequest", bloodRequestSchema);
