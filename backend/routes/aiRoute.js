import express from "express";
import rateLimit from "express-rate-limit";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { reviewResumeWithAI } from "../controllers/aiController.js";

const router = express.Router();

const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.id || req.ip,
  message: {
    message: "AI rate limit exceeded. Please try again in an hour.",
    success: false,
  },
});

router.post("/resume-review", isAuthenticated, aiLimiter, reviewResumeWithAI);

export default router;
