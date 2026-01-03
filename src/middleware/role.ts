import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/AuthRequest";

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
