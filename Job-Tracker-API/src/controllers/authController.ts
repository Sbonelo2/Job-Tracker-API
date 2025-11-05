import {Request, Response} from 'express';
import * as authService from '../service/applicationSerevice';
import * as userService from '../service/userService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const existingUser = await userService.findUserByEmail(email, password)
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const user = await userService.createUser(email, password);
        res.status(201).json({ message: "User registered successfully", userId: user.id });
    } catch (error) {
        res.status(500).json({ message: "Error in user registration" });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const user = await userService.findUserByEmail(email, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const payload = { userId: user.id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
             expiresIn: '1h',
        });
        res.status(200).json({message: "Login successful", token});  
    } catch (error) {
        res.status(500).json({ message: "Error in user login" });
    }
};
