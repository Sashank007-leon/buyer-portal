import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { handleAddFavourite, handleGetFavourites, handleRemoveFavourite } from "../controllers/favourite.controller";

const router = Router();

router.use(authMiddleware); 

router.post("/", handleAddFavourite);
router.get("/", handleGetFavourites);         
router.delete("/:propertyId", authMiddleware, handleRemoveFavourite); 

export default router;