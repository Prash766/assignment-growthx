import { Router } from "express";
import { check } from "express-validator";
import { registerUser, loginUser, uploadAssignment, getAdmins } from "../controllers/user.controller";
import { validateToken } from "../middlewares/auth.middleware";
import { Admin } from "../models/admin.models";
const router = Router()

router.route("/register").post([
check("email", "Enter the Email").isString(),
check("password", "Password should of minimum 6 CHaracter or more than that"),
check("fullName", "Enter the FullName").isString()
], 
registerUser)

router.route("/login").post([
    check("password", "Password should of minimum 6 CHaracter or more than that"),
    check("email", "Enter the Email").isString(),
],
loginUser

)
router.route('/upload').post( [
    check("task", "Enter the task").isString(),
    check("adminId" ,"Enter the admin id").isString()
] ,validateToken, uploadAssignment)
router.route('/admins').get( validateToken , getAdmins)


export default router
