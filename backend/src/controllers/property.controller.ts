import { Request, Response } from "express";
import { getAllProperties } from "../models/property.model";

export const fetchProperties = async (req: Request, res: Response) => {
    try {
        const properties = await getAllProperties();
        res.status(200).json(properties);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};