import axios from "axios";
import { AI_API_END_POINT } from "@/utils/constant";

export const reviewResume = async (resumeText, jobId) => {
  const payload = { resumeText, jobId };
  const res = await axios.post(`${AI_API_END_POINT}/resume-review`, payload, {
    withCredentials: true,
  });
  return res.data;
};

export default reviewResume;
