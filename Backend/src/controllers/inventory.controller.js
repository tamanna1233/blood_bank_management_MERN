import { BloodInventory } from "../model/bloodInventory.model.js";
import { InventoryTransaction } from "../model/inventoryTransaction.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

const initializeInventory = async () => {
  const bloodGroups = [
    "A_pos",
    "A_neg",
    "B_pos",
    "B_neg",
    "O_pos",
    "O_neg",
    "AB_pos",
    "AB_neg",
  ];
  for (const bg of bloodGroups) {
    const exists = await BloodInventory.findOne({ bloodGroup: bg });
    if (!exists) {
      await BloodInventory.create({ bloodGroup: bg });
    }
  }
};

const getInventory = asyncHandler(async (req, res) => {
  await initializeInventory(); // Ensure all groups exist
  const inventory = await BloodInventory.find().sort({ bloodGroup: 1 });
  return res
    .status(200)
    .json(
      new apiResponse(200, { inventory }, "Inventory fetched successfully"),
    );
});

const getTransactionHistory = asyncHandler(async (req, res) => {
  const transactions = await InventoryTransaction.find()
    .sort({ createdAt: -1 })
    .populate("performedBy", "email");
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { transactions },
        "Transactions fetched successfully",
      ),
    );
});

const manualAdjustInventory = asyncHandler(async (req, res) => {
  const { bloodGroup, units, transactionType, remark } = req.body;

  if (!bloodGroup || !units || !transactionType) {
    throw new apiError(
      400,
      "Blood group, units, and transaction type are required",
    );
  }

  if (
    !["MANUAL_ADD", "MANUAL_REMOVE", "CORRECTION"].includes(transactionType)
  ) {
    throw new apiError(400, "Invalid transaction type for manual adjustment");
  }

  const inventory = await BloodInventory.findOne({ bloodGroup });
  if (!inventory) {
    throw new apiError(404, "Blood group not found in inventory");
  }

  const previousUnits = inventory.availableUnits;
  let updatedUnits = previousUnits;
  const parsedUnits = parseInt(units, 10);

  if (transactionType === "MANUAL_ADD") {
    updatedUnits += parsedUnits;
  } else if (transactionType === "MANUAL_REMOVE") {
    updatedUnits -= parsedUnits;
  } else if (transactionType === "CORRECTION") {
    updatedUnits = parsedUnits; // In this case units means the exact new value
  }

  if (updatedUnits < 0) {
    throw new apiError(400, "Available units cannot be negative");
  }

  inventory.availableUnits = updatedUnits;
  inventory.lastUpdatedBy = req.user._id;
  await inventory.save();

  const transaction = await InventoryTransaction.create({
    bloodGroup,
    transactionType,
    units: parsedUnits,
    previousUnits,
    updatedUnits,
    performedBy: req.user._id,
    remark,
  });

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { inventory, transaction },
        "Inventory adjusted successfully",
      ),
    );
});

export { getInventory, getTransactionHistory, manualAdjustInventory };
