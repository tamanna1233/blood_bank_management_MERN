import { Router } from "express";
import { verifyJwt } from "../middleware/Admin.middelware.js"; 
// We will need patient and donor middlewares to secure their respective routes properly.
import { verifyJwt as verifyPatientJwt } from "../middleware/patient.auth.middelware.js";
import { verifyJwt as verifyDonorJwt } from "../middleware/donor.auth.middelware.js";
import { verifyJwt as verifyHospitalJwt } from "../middleware/hospital.auth.middelware.js";

import { 
    submitDonationRequest, 
    updateDonationStatus, 
    submitBloodRequest, 
    updateBloodRequestStatus, 
    issueBlood,
    getAllDonationRequests,
    getAllBloodRequests,
    getPatientBloodRequests
} from "../controllers/workflow.controller.js";

const router = Router();

// Middleware wrapper helper (assuming we need to attach roles)
const attachRole = (role) => (req, res, next) => {
    req.userRole = role;
    next();
};

// Donor routes
router.route("/donate").post(verifyDonorJwt, submitDonationRequest);

// Patient & Hospital routes
router.route("/request-blood/patient")
    .post(verifyPatientJwt, attachRole('patient'), submitBloodRequest)
    .get(verifyPatientJwt, attachRole('patient'), getPatientBloodRequests);
router.route("/request-blood/hospital").post(verifyHospitalJwt, attachRole('hospital'), submitBloodRequest);

// Admin routes
router.route("/donations").get(verifyJwt, getAllDonationRequests);
router.route("/blood-requests").get(verifyJwt, getAllBloodRequests);
router.route("/donation/:requestId/status").put(verifyJwt, updateDonationStatus);
router.route("/blood-request/:requestId/status").put(verifyJwt, updateBloodRequestStatus);
router.route("/blood-request/:requestId/issue").post(verifyJwt, issueBlood);

// Hospital workflow routes
router.route("/hospital/donations").get(verifyHospitalJwt, getAllDonationRequests);
router.route("/hospital/donation/:requestId/status").put(verifyHospitalJwt, updateDonationStatus);
router.route("/hospital/blood-requests").get(verifyHospitalJwt, getAllBloodRequests);
router.route("/hospital/blood-request/:requestId/status").put(verifyHospitalJwt, updateBloodRequestStatus);
router.route("/hospital/blood-request/:requestId/issue").post(verifyHospitalJwt, issueBlood);

export default router;
