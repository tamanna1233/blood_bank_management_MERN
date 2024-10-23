import {Router} from "express"
import { adminregister, donorList, getCurrentUser, login, logout, orgainizationList } from "../controllers/admin.controler.js"
import { verifyJwt } from "../middleware/Admin.middelware.js"

const router=Router()
router.route("/register").post(adminregister)
router.route("/login").post( login)
router.route("/getcurentuser").get(verifyJwt,getCurrentUser)
router.route("/donorlist").get(verifyJwt,donorList)
router.route("/organizationlist").get(verifyJwt,orgainizationList)
router.route("/logout").get(verifyJwt,logout)
export default router 