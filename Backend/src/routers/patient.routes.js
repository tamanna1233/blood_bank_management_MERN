import {Router} from "express"
import { login, logout, verifyOtp } from "../controllers/patient.controller.js"
import {verifyJwt} from "../middleware/patient.auth.middelware.js"
const router = Router() 

router.route("/login").post(login)

router.route("/verifyOtp").post(verifyOtp)
router.route("/logout").post(verifyJwt,logout)
 export default router 