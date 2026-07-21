import { Router } from "express";
import { verifyJwt } from "../middleware/Admin.middelware.js";
import { verifyJwt as verifyHospitalJwt } from "../middleware/hospital.auth.middelware.js";
import { getInventory, getTransactionHistory, manualAdjustInventory } from "../controllers/inventory.controller.js";

const router = Router();

router.route("/").get(verifyJwt, getInventory);
router.route("/hospital").get(verifyHospitalJwt, getInventory);
router.route("/transactions").get(verifyJwt, getTransactionHistory);
router.route("/adjust").post(verifyJwt, manualAdjustInventory);

export default router;
