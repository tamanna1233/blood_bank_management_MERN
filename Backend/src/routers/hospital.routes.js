import { Router } from "express";
import { hospitalRegister, loginHospital, logoutHospital } from "../controllers/hospital.controller.js";
import { verifyJwt } from "../middleware/hospital.auth.middelware.js";

import { matchBloodGroup } from "../controllers/patient.controller.js";

const router = Router();
router.route("/register").post(hospitalRegister);
router.route("/login").post(loginHospital);
router.route("/logout").post(verifyJwt, logoutHospital);
router.route("/matchblood").post(verifyJwt, matchBloodGroup);

export default router;