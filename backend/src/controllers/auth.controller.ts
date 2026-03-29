import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import { createUser, getUserByEmail } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Register
export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = registerSchema.parse(req.body);

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser(name, email, hashedPassword);

        res.status(201).json(newUser);
    } catch (err: any) {
        if (err.name === "ZodError") {
            return res.status(400).json({ message: err.errors });
        }
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Login
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
                email: user.email,
            },
        });
    } catch (err: any) {
        if (err.name === "ZodError") {
            return res.status(400).json({ message: err.errors });
        }
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};