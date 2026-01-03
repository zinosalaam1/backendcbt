import { Router, Response } from "express";
import ExamAttempt from "../models/ExamAttempt";
import Exam from "../models/Exam";
import { authMiddleware } from "../middleware/auth"; // ✅ correct import
import { AuthRequest } from "../types/AuthRequest";   // ✅ correct import

const router = Router();

/**
 * POST /api/attempts
 * Student submits an exam
 */
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { examId, answers } = req.body;

    if (!examId || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid submission data" });
    }

    const exam = await Exam.findById(examId).populate("questions");
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    let correctAnswers = 0;

    exam.questions.forEach((question: any) => {
      const userAnswer = answers.find(
        (a: any) => a.questionId === question._id.toString()
      );

      if (userAnswer && userAnswer.selectedOption === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const attempt = await ExamAttempt.create({
      studentId: req.user?.id, // ✅ optional chaining
      examId,
      score: correctAnswers,
      totalQuestions: exam.questions.length,
      correctAnswers,
    });

    res.status(201).json({ attempt });
  } catch (error) {
    console.error("Submit exam error:", error);
    res.status(500).json({ message: "Failed to submit exam" });
  }
});

/**
 * GET /api/attempts
 * ADMIN: get ALL attempts
 */
router.get("/", authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    const attempts = await ExamAttempt.find()
      .populate("studentId", "name email")
      .populate("examId", "title subject")
      .sort({ createdAt: -1 });

    res.json({ attempts });
  } catch (error) {
    console.error("Admin fetch attempts error:", error);
    res.status(500).json({ message: "Failed to fetch attempts" });
  }
});

/**
 * GET /api/attempts/student
 * STUDENT: get own attempts
 */
router.get(
  "/student",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const attempts = await ExamAttempt.find({
        studentId: req.user?.id,
      })
        .populate("examId", "title subject")
        .sort({ createdAt: -1 });

      res.json({ attempts });
    } catch (error) {
      console.error("Student fetch attempts error:", error);
      res.status(500).json({ message: "Failed to fetch attempts" });
    }
  }
);

/**
 * GET /api/attempts/student/:studentId
 * ADMIN: get attempts for ONE student
 */
router.get(
  "/student/:studentId",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { studentId } = req.params;

      const attempts = await ExamAttempt.find({ studentId })
        .populate("studentId", "name email")
        .populate("examId", "title subject")
        .sort({ createdAt: -1 });

      res.json({ attempts });
    } catch (error) {
      console.error("Admin fetch student attempts error:", error);
      res.status(500).json({ message: "Failed to fetch attempts" });
    }
  }
);

export default router;
