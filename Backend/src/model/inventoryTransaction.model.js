import { model, Schema } from "mongoose";

const inventoryTransactionSchema = new Schema({
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
    transactionType: {
        type: String,
        enum: ['DONATION', 'BLOOD_ISSUE', 'MANUAL_ADD', 'MANUAL_REMOVE', 'CORRECTION'],
        required: true,
    },
    units: {
        type: Number,
        required: true,
    },
    previousUnits: {
        type: Number,
        required: true,
    },
    updatedUnits: {
        type: Number,
        required: true,
    },
    referenceId: {
        type: Schema.Types.ObjectId, // Could point to Donation, Request, etc.
    },
    performedBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    },
    remark: {
        type: String
    }
}, { timestamps: true });

export const InventoryTransaction = model("InventoryTransaction", inventoryTransactionSchema);
