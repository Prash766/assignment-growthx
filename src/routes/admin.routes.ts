import { Router } from "express";
import { acceptAssignment, getAssignments, loginAdmin, registerAdmin, rejectAssignment } from "../controllers/admin.controller";
import { validateToken } from "../middlewares/auth.middleware";
import { check } from "express-validator";
const router = Router()

router.route('/register').post([
    check("fullName", "Enter the Admin Name").isString(),
    check("email", "Enter Email").isEmail(),
    check('password', 'Password should be a minimum of 6 characters').isLength({ min: 6 }),

] ,registerAdmin);
router.route('/login').post([
    check("email", "Enter Email").isEmail(),
    check('password', 'Password should be a minimum of 6 characters').isLength({ min: 6 }),

] ,loginAdmin);
router.route('/assignments').get(validateToken , getAssignments);
router.route('/assignments/:id/accept').post(validateToken , acceptAssignment);
router.route('/assignments/:id/reject').post(validateToken , rejectAssignment);

export default router
