import { Router } from "express";
import { check } from "express-validator";
import { registerUser, loginUser } from "../controllers/user.controller";
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


export default router
