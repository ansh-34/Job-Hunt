import { Job } from "../models/job.model.js";
import { analyzeResume } from "../services/aiService.js";

export const reviewResumeWithAI = async (req, res) => {
  try {
    const { resumeText, jobId } = req.body || {};

    if (!resumeText || !jobId) {
      return res.status(400).json({
        message: "resumeText and jobId are required",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const jobDescriptionParts = [
      `Title: ${job.title}`,
      `Description: ${job.description}`,
      job.requirements?.length
        ? `Requirements: ${job.requirements.join(", ")}`
        : "Requirements: Not specified",
      `Experience Level: ${job.experienceLevel}`,
      `Location: ${job.location}`,
      `Job Type: ${job.jobType}`,
    ];

    const aiResult = await analyzeResume(resumeText, jobDescriptionParts.join("\n"));

    return res.status(200).json({
      success: true,
      data: aiResult,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);
    return res.status(500).json({
      message: error?.message || "Unable to review resume",
      success: false,
    });
  }
};
