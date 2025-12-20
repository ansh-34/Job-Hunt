# 🎯 JobHunt - Full Stack Job Portal Application

A modern, full-stack job portal platform built with the MERN stack that connects job seekers with recruiters. Features role-based dashboards, AI-powered resume analysis, and real-time job application management.

![Job Portal](https://img.shields.io/badge/Status-Production-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌐 Live Demo

**Frontend:** [https://job-hunt-uisy.onrender.com](https://job-hunt-uisy.onrender.com)

## ✨ Key Features

### For Job Seekers (Students)
- 🔐 **Secure Authentication** - Register/Login with JWT-based authentication
- 📝 **Profile Management** - Upload resume, add skills, bio, and profile photo
- 🔍 **Job Search & Filter** - Browse and search jobs by title, location, and keywords
- 📋 **Job Applications** - Apply to jobs and track application status
- 🤖 **AI Resume Review** - Get AI-powered resume analysis and improvement suggestions
- 📊 **Application Dashboard** - View all applied jobs and their status

### For Recruiters
- 🏢 **Company Management** - Create and manage company profiles with logos
- 📢 **Job Posting** - Post job listings with detailed requirements
- 👥 **Applicant Tracking** - View and manage job applications
- ✅ **Application Review** - Accept or reject candidates
- 📈 **Dashboard Analytics** - Monitor posted jobs and applicants

### General Features
- 🎨 **Modern UI/UX** - Built with Tailwind CSS and Radix UI components
- 📱 **Responsive Design** - Optimized for all devices
- 🌓 **Dark Mode Support** - Theme toggle with next-themes
- 🔒 **Protected Routes** - Role-based access control
- ☁️ **Cloud Storage** - Resume and image uploads via Cloudinary
- 🚀 **Fast & Scalable** - Optimized for production deployment

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Sonner** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud storage for files/images
- **OpenRouter AI** - AI-powered resume analysis
- **Express Rate Limit** - API rate limiting

## 📁 Project Structure

```
jobHunt/
├── backend/
│   ├── controllers/          # Business logic
│   │   ├── user.controller.js
│   │   ├── job.controller.js
│   │   ├── company.controller.js
│   │   ├── application.controller.js
│   │   └── aiController.js
│   ├── models/              # Database schemas
│   │   ├── user.model.js
│   │   ├── job.model.js
│   │   ├── company.model.js
│   │   └── application.model.js
│   ├── routes/              # API endpoints
│   │   ├── user.route.js
│   │   ├── job.route.js
│   │   ├── company.route.js
│   │   ├── application.route.js
│   │   └── aiRoute.js
│   ├── middlewares/         # Custom middleware
│   │   ├── isAuthenticated.js
│   │   └── mutler.js
│   ├── services/            # External services
│   │   └── aiService.js
│   ├── utils/               # Utility functions
│   │   ├── cloudinary.js
│   │   ├── datauri.js
│   │   └── db.js
│   └── index.js            # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── admin/      # Recruiter dashboard
│   │   │   ├── auth/       # Authentication
│   │   │   ├── shared/     # Shared components
│   │   │   └── ui/         # UI components
│   │   ├── pages/          # Page components
│   │   │   └── ResumeAI.jsx
│   │   ├── redux/          # State management
│   │   │   ├── store.js
│   │   │   ├── authSlice.js
│   │   │   ├── jobSlice.js
│   │   │   ├── companySlice.js
│   │   │   └── applicationSlice.js
│   │   ├── hooks/          # Custom React hooks
│   │   ├── api/            # API integration
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   └── public/             # Static assets
└── package.json            # Root dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- Cloudinary account
- OpenRouter API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ansh-34/Job-Hunt.git
   cd jobHunt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000
   
   # Database
   MONGO_URI=your_mongodb_connection_string
   
   # Authentication
   SECRET_KEY=your_jwt_secret_key
   
   # Cloudinary (File Storage)
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   
   # OpenRouter AI (Resume Analysis)
   OPENROUTER_API_KEY=your_openrouter_api_key
   OPENROUTER_REFERRER=https://job-hunt-uisy.onrender.com
   OPENROUTER_APP_NAME=JobHunt
   ```

4. **Run the application**

   **Development mode:**
   ```bash
   # Run backend
   npm run dev
   
   # Run frontend (in a new terminal)
   cd frontend
   npm run dev
   ```

   **Production build:**
   ```bash
   # Build frontend
   npm run build
   
   # Start server
   npm start
   ```

   The app will be available at:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📡 API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout
- `POST /api/v1/user/profile/update` - Update user profile

### Jobs
- `GET /api/v1/job/get` - Get all jobs (with filters)
- `GET /api/v1/job/getadminjobs` - Get recruiter's posted jobs
- `GET /api/v1/job/get/:id` - Get job by ID
- `POST /api/v1/job/post` - Create new job (recruiter only)
- `PUT /api/v1/job/update/:id` - Update job (recruiter only)

### Companies
- `POST /api/v1/company/register` - Register new company
- `GET /api/v1/company/get` - Get all companies
- `GET /api/v1/company/get/:id` - Get company by ID
- `PUT /api/v1/company/update/:id` - Update company

### Applications
- `POST /api/v1/application/apply/:id` - Apply for a job
- `GET /api/v1/application/get` - Get user's applications
- `GET /api/v1/application/:id/applicants` - Get job applicants (recruiter)
- `POST /api/v1/application/status/:id/update` - Update application status

### AI Services
- `POST /api/v1/ai/resume-review` - AI-powered resume analysis

## 🗄️ Database Schema

### User Model
```javascript
{
  fullname: String,
  email: String (unique),
  phoneNumber: Number,
  password: String (hashed),
  role: Enum ['student', 'recruiter'],
  profile: {
    bio: String,
    skills: [String],
    resume: String (URL),
    resumeOriginalName: String,
    company: ObjectId (ref: Company),
    profilePhoto: String (URL)
  },
  timestamps: true
}
```

### Job Model
```javascript
{
  title: String,
  description: String,
  requirements: [String],
  salary: Number,
  experienceLevel: Number,
  location: String,
  jobType: String,
  position: Number,
  company: ObjectId (ref: Company),
  created_by: ObjectId (ref: User),
  applications: [ObjectId (ref: Application)],
  timestamps: true
}
```

### Company Model
```javascript
{
  name: String (unique),
  description: String,
  website: String,
  location: String,
  logo: String (URL),
  userId: ObjectId (ref: User),
  timestamps: true
}
```

### Application Model
```javascript
{
  job: ObjectId (ref: Job),
  applicant: ObjectId (ref: User),
  status: Enum ['pending', 'accepted', 'rejected'],
  timestamps: true
}
```

## 🤖 AI Resume Review

The application includes an AI-powered resume review feature that:
- Analyzes resume content against job descriptions
- Provides a match score (0-100)
- Identifies missing skills and technologies
- Suggests actionable improvements
- Powered by OpenRouter AI (Mistral-7B model)

**How it works:**
1. Student pastes their resume text
2. Selects a target job position
3. AI analyzes the match and provides detailed feedback
4. Returns structured JSON with scores, gaps, and suggestions

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- HTTP-only cookies for token storage
- Protected API routes with middleware
- Role-based access control
- Rate limiting on API endpoints
- CORS configuration for production
- Input validation and sanitization

## 🌍 Deployment

### Render Deployment (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create a Web Service on Render**
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Start command: `npm start`
   - Add environment variables from `.env`

3. **Configure CORS**
   - Update allowed origins in `backend/index.js`
   - Set `OPENROUTER_REFERRER` to your production URL

4. **Deploy**
   - Render will automatically build and deploy
   - Access your app at the provided URL

## 🧪 Testing

**Manual Testing:**
1. Register as a student and recruiter (use different emails)
2. As recruiter: Create company → Post jobs
3. As student: Browse jobs → Apply → Test AI resume review
4. As recruiter: View applicants → Update application status

## 📝 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | Yes |
| `MONGO_URI` | MongoDB connection string | Yes |
| `SECRET_KEY` | JWT secret for token signing | Yes |
| `CLOUD_NAME` | Cloudinary cloud name | Yes |
| `API_KEY` | Cloudinary API key | Yes |
| `API_SECRET` | Cloudinary API secret | Yes |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI | Yes |
| `OPENROUTER_REFERRER` | Your app URL | Optional |
| `OPENROUTER_APP_NAME` | Application name | Optional |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Ansh Goel**
- GitHub: [@ansh-34](https://github.com/ansh-34)
- Repository: [Job-Hunt](https://github.com/ansh-34/Job-Hunt)

## 🙏 Acknowledgments

- React and Vite teams for amazing tools
- Radix UI for accessible components
- Cloudinary for file storage
- OpenRouter for AI capabilities
- MongoDB for database solutions

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Check existing documentation
- Review API endpoints and examples

---

**Note:** This is a portfolio/educational project. For production use, consider additional security measures, testing, and optimization.

Made with ❤️ using MERN Stack
