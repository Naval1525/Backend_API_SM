import { Request, Response } from "express";
import { registerUser, loginUser } from '../services/auth.service';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error registering user",
      error,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await loginUser(req.body);
    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(401).json({
      message: "Error logging in user",
      error,
    });
  }
};