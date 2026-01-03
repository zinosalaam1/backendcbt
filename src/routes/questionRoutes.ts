import { Router, Request, Response } from "express";
import Question from "../models/Question";

const router = Router();

router.post("/by-ids", async (req: Request, res: Response) => {
  try {
    const { questionIds } = req.body as { questionIds: string[] };

    if (!Array.isArray(questionIds) || questionIds.length === 0) {
      return res.status(400).json({ message: "questionIds required" });
    }

    const questions = await Question.find({
      _id: { $in: questionIds }
    });

    return res.status(200).json(questions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch questions" });
  }
});

export default router;
