import { AuthRequest } from "../types/AuthRequest";
import { Response, NextFunction } from "express";

const handler = (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log(req.user?.id); // now works
  next();
};
