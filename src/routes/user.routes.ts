import { Router } from "express";
import { check } from "express-validator";
import { registerUser } from "../controllers/user.controller";
const router = Router()

router.route("/register").post([
check("email", "Enter the Email").isString(),
check("password", "Password should of minimum 6 CHaracter or more than that").isString(),

], 
registerUser)

router.route("/login").post()


export default router
