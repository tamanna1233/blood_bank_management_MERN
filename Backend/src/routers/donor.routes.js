import {Router} from "express"
import { donorregister, login, logout } from "../controllers/donor.controler.js"
import { verifyJwt } from "../middleware/donor.auth.middelware.js"
const router=Router()
router.route("/register").post(donorregister)

router.route("/login").post(login)
router.route("/logout").post( verifyJwt, logout)
export default router