import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

// Extend the Request type
declare module 'express-serve-static-core' {
  interface Request {
    user: JwtPayload & { id: string };
  }
}

const auth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = verifyToken(token);

    // Ensure the decoded token has an id property
    if (typeof decoded === 'string' || !decoded.id) {
       res.status(401).json({ message: "Invalid token format" });
       return;
    }

    req.user = decoded as JwtPayload & { id: string };
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;