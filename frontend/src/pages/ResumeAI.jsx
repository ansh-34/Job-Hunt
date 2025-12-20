import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { reviewResume } from "@/api/aiApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, BadgeCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

const MIN_RESUME_LENGTH = 120;

const colorForScore = (score) => {
  if (score >= 75) return "bg-emerald-500";
  if (score >= 50) return "bg-amber-400";
  return "bg-rose-500";
};

const ResumeAI = () => {
  const { user } = useSelector((state) => state.auth);
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const isSubmitDisabled = useMemo(() => {
    return (
      loading ||
      !resumeText.trim() ||
      resumeText.trim().length < MIN_RESUME_LENGTH ||
      !jobId
    );
  }, [loading, resumeText, jobId]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data?.success && Array.isArray(res.data.jobs)) {
          setJobs(res.data.jobs);
          if (res.data.jobs.length) {
            setJobId(res.data.jobs[0]._id);
          }
        } else {
          setJobs([]);
        }
      } catch (err) {
        setJobs([]);
        toast.error(err?.response?.data?.message || "Unable to load jobs");
      }
    };
    fetchJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!resumeText.trim() || resumeText.trim().length < MIN_RESUME_LENGTH) {
      setError(`Please provide at least ${MIN_RESUME_LENGTH} characters of resume content.`);
      return;
    }

    try {
      setLoading(true);
      const data = await reviewResume(resumeText.trim(), jobId);
      if (data?.success) {
        setResult(data.data);
      } else {
        setError(data?.message || "Unable to analyze resume");
      }
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        setError("You are not authorized. Please log in again.");
      } else if (status === 429) {
        setError(err?.response?.data?.message || "Rate limit exceeded. Try later.");
      } else {
        setError(err?.response?.data?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 px-4">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-2">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">AI Assistant</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">AI Resume Review</h1>
          <p className="text-slate-600 dark:text-slate-300">Paste your resume, pick a job, and get focused feedback tailored for students.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Resume Text</label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume content here. Include projects, skills, internships, and coursework."
                  rows={10}
                  className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Minimum {MIN_RESUME_LENGTH} characters</span>
                  <span>{resumeText.trim().length} chars</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Target Job</label>
                  <Select
                    value={jobId || undefined}
                    onValueChange={(val) => setJobId(val)}
                    disabled={!jobs.length}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a job" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs.map((job) => (
                        <SelectItem key={job._id} value={job._id}>
                          {job.title} {job.company?.name ? `• ${job.company.name}` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Quick Note (optional)</label>
                  <Input placeholder="e.g., Looking for frontend internships" disabled />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-100">
                  <AlertCircle className="h-4 w-4 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <Button type="submit" disabled={isSubmitDisabled} className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  "Analyze Resume"
                )}
              </Button>
            </form>
          </section>

          <aside className="bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <BadgeCheck className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Tips for best results</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Include projects, tech stack, internships, and coursework.</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
              <li>Mention languages, frameworks, tools, and cloud/platform skills.</li>
              <li>Add metrics: users, performance gains, time saved.</li>
              <li>Highlight recent work relevant to the selected job.</li>
            </ul>
          </aside>
        </div>

        <section className="bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          {!result && (
            <div className="text-slate-500 dark:text-slate-400 text-sm">
              AI feedback will appear here after you analyze your resume.
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Match Score</p>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-50">{result.matchScore}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${colorForScore(result.matchScore)} transition-all duration-500`}
                    style={{ width: `${Math.min(Math.max(result.matchScore, 0), 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">Missing Skills</h3>
                  {result.missingSkills && result.missingSkills.length ? (
                    <ul className="space-y-2">
                      {result.missingSkills.map((skill, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                          <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">No major gaps detected.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">Improvements</h3>
                  {result.improvements && result.improvements.length ? (
                    <ul className="space-y-2">
                      {result.improvements.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">No specific improvements suggested.</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">Summary</h3>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.summary || "No summary provided."}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ResumeAI;
