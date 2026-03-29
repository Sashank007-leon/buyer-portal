import express from "express";
import { register, login } from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../validations/auth.validation";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;