 import {Router} from "express"
import { organisationRegister } from "../controllers/organization.controler.js"
 const router=Router()
 router.route("/registerOrganization").post(organisationRegister)
 export default router