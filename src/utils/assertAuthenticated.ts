import { Response } from "express";
import { AuthRequest } from "../types/AuthRequest";

export function assertAuthenticated(
  req: AuthRequest,
  res: Response
): req is AuthRequest & { user: NonNullable<AuthRequest["user"]> } {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return false;
  }
  return true;
}
