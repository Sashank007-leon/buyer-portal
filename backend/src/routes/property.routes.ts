import { Router } from "express";
import { fetchProperties } from "../controllers/property.controller";

const router = Router();

router.get("/", fetchProperties);

export default router;