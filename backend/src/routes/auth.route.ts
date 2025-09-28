import { Router } from "express";
import { signup, login, verifyOTP } from "../controllers/auth.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", authMiddleware, verifyOTP);

export default router;
