import { model, Schema } from "mongoose";

const bloodInventorySchema = new Schema(
  {
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
      unique: true,
    },
    availableUnits: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalDonatedUnits: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalIssuedUnits: {
      type: Number,
      default: 0,
      min: 0,
    },
    minimumStockLevel: {
      type: Number,
      default: 5,
      min: 0,
    },
    lastUpdatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true },
);

export const BloodInventory = model("BloodInventory", bloodInventorySchema);
