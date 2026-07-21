import { model, Schema } from "mongoose";

const donationRequestSchema = new Schema(
  {
    donor: {
      type: Schema.Types.ObjectId,
      ref: "Donor",
      required: true,
    },
    requestedBloodType: {
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
    preferredDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
    adminRemark: {
      type: String,
    },
    completionDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

export const DonationRequest = model("DonationRequest", donationRequestSchema);
