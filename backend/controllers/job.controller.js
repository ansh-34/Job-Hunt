import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };

        // Validate salary is a valid number
        const parsedSalary = parseInt(salary);
        if (isNaN(parsedSalary)) {
            return res.status(400).json({
                message: "Salary must be a valid number.",
                success: false
            })
        };

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: parsedSalary,
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        console.log("=== getAllJobs Filter Debug ===");
        console.log("Keyword received:", keyword);
        
        const query = {};

        if (!keyword) {
            // If no keyword, return all jobs
            console.log("No keyword - returning all jobs");
            const jobs = await Job.find(query).populate({
                path: "company"
            }).sort({ createdAt: -1 });
            
            console.log("Total jobs found:", jobs.length);
            return res.status(200).json({
                jobs,
                success: true
            });
        }

        // Search by title or description (for general search)
        query.$or = [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { location: { $regex: keyword, $options: "i" } }, // Also search location
        ];

        // Filter by location (case-insensitive partial match)
        if (keyword === "Delhi NCR" || keyword === "Bangalore" || keyword === "Hyderabad" || keyword === "Pune" || keyword === "Mumbai") {
            console.log("Location filter applied for:", keyword);
            query.$or = [
                { location: { $regex: keyword, $options: "i" } }
            ];
        }

        // Filter by job type (Frontend, Backend, FullStack Developer)
        if (keyword === "Frontend Developer" || keyword === "Backend Developer" || keyword === "FullStack Developer") {
            console.log("Job type filter applied for:", keyword);
            delete query.$or;
            query.jobType = { $regex: keyword.split(" ")[0], $options: "i" };
        }

        // Filter by salary range
        if (keyword === "0-40k") {
            console.log("Salary filter applied: 0-40k");
            delete query.$or;
            query.salary = { $gte: 0, $lte: 40000 };
        } else if (keyword === "42-1lakh") {
            console.log("Salary filter applied: 42-1lakh");
            delete query.$or;
            query.salary = { $gte: 42000, $lte: 100000 };
        } else if (keyword === "1lakh to 5lakh") {
            console.log("Salary filter applied: 1lakh to 5lakh");
            delete query.$or;
            query.salary = { $gte: 100000, $lte: 500000 };
        }

        console.log("Final query:", JSON.stringify(query, null, 2));
        
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        console.log("Jobs found:", jobs.length);
        
        return res.status(200).json({
            jobs: jobs || [],
            success: true
        })
    } catch (error) {
        console.log("getAllJobs Error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
