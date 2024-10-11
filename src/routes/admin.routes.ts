import { Router } from "express";
import { loginAdmin, registerAdmin } from "../controllers/admin.controller";
const router = Router()

router.route('/register').post( registerAdmin);
router.route('/login').post(loginAdmin);
router.route('/assignments').post();
router.route('/assignments/:id/accept').post();
router.route('/assignments/:id/reject').post();

export default router
