import type { Request, Response } from "express";
import { signupType } from "../types";
import { db } from "../../prisma/db";
import { hashPassword } from "../utils/passwordhash";



export async function signupController(req: Request, res: Response){
    const parsedInput = signupType.safeParse(req.body);
    if(!parsedInput.success){
        return res.status(400).json({
            error: "Invalid user input"
        });
    }
    const {email, username, password} = parsedInput.data;
    try {
        const existingUser = await db.orm.public.User
            .whereUnique({ email })
            .first();

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await db.orm.public.User.create({
            email,
            username,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User created successfully"
        });

    } catch (error) {
        console.error("Signup error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }

}