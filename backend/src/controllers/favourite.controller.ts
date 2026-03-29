import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { addFavouriteToDB, removeFavouriteFromDB, getUserFavouritesFromDB } from "../models/favourite.model";

export const handleAddFavourite = async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const { propertyId } = req.body;

    if (!propertyId) return res.status(400).json({ message: "Property ID required" });

    try {
        const added = await addFavouriteToDB(userId, propertyId);
        if (!added) return res.status(400).json({ message: "Already in favourites" });
        res.status(201).json(added);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

export const handleRemoveFavourite = async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;

    const { propertyId } = req.params;

    if (!propertyId || typeof propertyId !== 'string') {
        return res.status(400).json({ message: "A valid Property ID is required" });
    }

    try {
        const deleted = await removeFavouriteFromDB(userId, propertyId);

        if (!deleted) {
            return res.status(404).json({ message: "Favourite not found" });
        }

        res.json({ message: "Removed from favourites" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const handleGetFavourites = async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    try {
        const favourites = await getUserFavouritesFromDB(userId);
        res.json(favourites); // Now returns full property objects!
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};