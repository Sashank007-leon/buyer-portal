// src/middleware/validate.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validate =
    (schema: ZodType) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = schema.parse(req.body); 
                next();
            } catch (err: any) {
                return res.status(400).json({
                    message: err.errors?.[0]?.message || "Validation failed",
                });
            }
        };