import {Router} from "express"
import { adminregister, donorList, getCurrentUser, login, logout, hospitalList, updateHospitalStatus } from "../controllers/admin.controler.js"
import { verifyJwt } from "../middleware/Admin.middelware.js"

const router=Router()
router.route("/register").post(adminregister)
router.route("/login").post( login)
router.route("/getcurentuser").get(verifyJwt,getCurrentUser)
router.route("/donorlist").get(verifyJwt,donorList)
router.route("/hospitallist").get(verifyJwt,hospitalList)
router.route("/hospital/:hospitalId/status").put(verifyJwt, updateHospitalStatus)
router.route("/logout").get(verifyJwt,logout)
export default router