import {Router} from "express"
import { adminregister, donorList, getCurrentUser, login, orgainizationList } from "../controllers/admin.controler.js"

const router=Router()
router.route("/register").post(adminregister)
router.route("/login").post(login)
router.route("/getcurentuser").get(getCurrentUser)
router.route("/donorlist").get(donorList)
router.route("/organizationlist").get(orgainizationList)
export default router 