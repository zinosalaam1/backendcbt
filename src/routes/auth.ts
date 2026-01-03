import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import generateToken from "../utils/generateToken"; // ✅ default import


const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user._id.toString());
  res.json({ token });
});

export default router;
