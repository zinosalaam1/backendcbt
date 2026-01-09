import { User } from "../user"; // optional, if you have a User model

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        role?: string;
      };
      // OR if you have a User type:
      // user?: User;
    }
  }
}

export {};
