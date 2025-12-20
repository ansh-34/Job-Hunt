import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import aiRoute from "./routes/aiRoute.js";
import path from "path";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Allow production frontend, backend domain, and local dev
const allowedOrigins = [
    "https://job-hunt-uisy.onrender.com",
    "https://jobhunt-5r8e.onrender.com",
    "http://localhost:5173"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

// Use Render-provided port with a safe local fallback
const PORT = process.env.PORT || 3000;
// Bind to all network interfaces (required by many PaaS providers like Render)
const HOST = "0.0.0.0";
const __dirname = path.resolve();


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/ai", aiRoute);

// lightweight health check so root/health endpoints respond even without frontend build
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


app.listen(PORT, HOST, ()=>{
    connectDB();
    console.log(`Server running on http://${HOST}:${PORT}`);
})