const PROMPT_TEMPLATE = `You are an ATS and technical recruiter helping a student or fresher. Compare the candidate's resume to the target job description. Identify gaps, missing skills, and actionable improvements.

Job Description:
{jobDescription}

Candidate Resume:
{resumeText}

Only respond with a valid JSON object matching this exact schema:
{
  "matchScore": number from 0 to 100,
  "missingSkills": string array,
  "improvements": string array,
  "summary": string
}

Rules:
- matchScore must be a whole number between 0 and 100.
- missingSkills lists concrete skills, tools, or technologies absent or weak in the resume.
- improvements should be concise resume edits or additions tailored for freshers/students.
- summary is a brief, recruiter-style evaluation.
- Return ONLY valid JSON. No markdown, no code blocks, no extra text.`;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "mistralai/mistral-7b-instruct:free";

export const analyzeResume = async (resumeText, jobDescription) => {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API key is not configured");
  }

  const prompt = PROMPT_TEMPLATE
    .replace("{jobDescription}", jobDescription)
    .replace("{resumeText}", resumeText);

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        // Optional but recommended for OpenRouter rate-limits/analytics
        "HTTP-Referer": process.env.OPENROUTER_REFERRER || "",
        "X-Title": process.env.OPENROUTER_APP_NAME || "JobHunt Backend",
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        temperature: 0.2,
        messages: [
          { role: "system", content: "You return only JSON matching the required schema." },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${errorText}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error(`Empty response from AI: ${JSON.stringify(data)}`);
    }

    const cleaned = content
      .replace(/```json\n?/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch (error) {
    const message = error?.message || "Failed to analyze resume";
    throw new Error(message);
  }
};

export default analyzeResume;
