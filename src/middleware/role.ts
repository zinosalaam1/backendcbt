import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/AuthRequest";

const role = (requiredRole: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

export default role;
