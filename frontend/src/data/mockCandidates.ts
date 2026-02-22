import { Candidate, DashboardStats } from '@/types';

export const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    role_alignment: "Full Stack Developer",
    skill_score: 87,
    project_depth: 82,
    consistency_score: 91,
    confidence_band: "High Potential",
    learning_gap: ["System Design", "Microservices"],
    status: "pending",
    application_date: "2024-02-15",
    github: {
      url: "https://github.com/priyasharma",
      repos: 28,
      stars: 156,
      languages: { "TypeScript": 45, "Python": 30, "JavaScript": 20, "Go": 5 },
      commits_90_days: 247,
      last_activity: "2024-02-18"
    },
    linkedin: "https://linkedin.com/in/priyasharma",
    resume: "resume_priya_sharma.pdf",
    resume_analysis: {
      ats_score: 85,
      skill_keywords: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
      project_quality: 88
    },
    role_match_scores: {
      "Full Stack Developer": 87,
      "Backend Developer": 82,
      "Frontend Developer": 79
    },
    analysis: "Strong full-stack developer with excellent GitHub activity. Demonstrates consistent contribution patterns and diverse technology exposure. Projects show solid understanding of modern web architecture. Would benefit from deeper system design knowledge and exposure to large-scale distributed systems. High potential for rapid growth in senior roles."
  },
  {
    id: 2,
    name: "Arjun Patel",
    email: "arjun.patel@gmail.com",
    phone: "+91 87654 32109",
    location: "Bangalore, Karnataka",
    role_alignment: "Backend Developer",
    skill_score: 78,
    project_depth: 75,
    consistency_score: 72,
    confidence_band: "Medium",
    learning_gap: ["Database Optimization", "Testing", "CI/CD"],
    status: "in_review",
    application_date: "2024-02-14",
    github: {
      url: "https://github.com/arjunpatel",
      repos: 15,
      stars: 42,
      languages: { "Java": 50, "Python": 30, "SQL": 15, "JavaScript": 5 },
      commits_90_days: 128,
      last_activity: "2024-02-17"
    },
    linkedin: "https://linkedin.com/in/arjunpatel",
    resume: "resume_arjun_patel.pdf",
    resume_analysis: {
      ats_score: 76,
      skill_keywords: ["Java", "Spring Boot", "MySQL", "REST API", "Git"],
      project_quality: 72
    },
    role_match_scores: {
      "Backend Developer": 78,
      "Full Stack Developer": 68,
      "DevOps Engineer": 65
    },
    analysis: "Solid backend fundamentals with Java/Spring experience. GitHub activity shows regular but not intensive contribution patterns. Projects demonstrate understanding of RESTful APIs and database interactions. Would benefit from learning modern DevOps practices, improving testing coverage, and exposure to high-performance systems. Good candidate for mentored growth."
  },
  {
    id: 3,
    name: "Ananya Iyer",
    email: "ananya.iyer@gmail.com",
    phone: "+91 76543 21098",
    location: "Chennai, Tamil Nadu",
    role_alignment: "Frontend Developer",
    skill_score: 92,
    project_depth: 88,
    consistency_score: 95,
    confidence_band: "High Potential",
    learning_gap: ["Backend Integration", "Web Performance"],
    status: "pending",
    application_date: "2024-02-16",
    github: {
      url: "https://github.com/ananyaiyer",
      repos: 34,
      stars: 289,
      languages: { "JavaScript": 40, "TypeScript": 35, "CSS": 15, "HTML": 10 },
      commits_90_days: 312,
      last_activity: "2024-02-19"
    },
    linkedin: "https://linkedin.com/in/ananyaiyer",
    resume: "resume_ananya_iyer.pdf",
    resume_analysis: {
      ats_score: 91,
      skill_keywords: ["React", "Vue.js", "Tailwind CSS", "Webpack", "Jest"],
      project_quality: 93
    },
    role_match_scores: {
      "Frontend Developer": 92,
      "Full Stack Developer": 85,
      "UI/UX Developer": 89
    },
    analysis: "Exceptional frontend developer with outstanding GitHub metrics. Demonstrates mastery of modern frontend frameworks and excellent code quality. Projects showcase strong understanding of user experience and responsive design. Very active contributor with consistent high-quality output. Minimal learning gaps, primarily needs backend exposure for full-stack growth."
  },
  {
    id: 4,
    name: "Rahul Gupta",
    email: "rahul.gupta@gmail.com",
    phone: "+91 65432 10987",
    location: "Hyderabad, Telangana",
    role_alignment: "DevOps Engineer",
    skill_score: 65,
    project_depth: 58,
    consistency_score: 61,
    confidence_band: "Risk",
    learning_gap: ["Docker", "Kubernetes", "Monitoring", "Security"],
    status: "pending",
    application_date: "2024-02-13",
    github: {
      url: "https://github.com/rahulgupta",
      repos: 8,
      stars: 12,
      languages: { "Shell": 40, "Python": 35, "YAML": 20, "Go": 5 },
      commits_90_days: 67,
      last_activity: "2024-02-16"
    },
    linkedin: "https://linkedin.com/in/rahulgupta",
    resume: "resume_rahul_gupta.pdf",
    resume_analysis: {
      ats_score: 62,
      skill_keywords: ["Linux", "Bash", "Git", "Jenkins", "AWS"],
      project_quality: 60
    },
    role_match_scores: {
      "DevOps Engineer": 65,
      "Backend Developer": 58,
      "System Administrator": 70
    },
    analysis: "Entry-level DevOps profile with basic infrastructure knowledge. GitHub activity is sporadic with limited project complexity. Demonstrates interest in automation but lacks depth in containerization and orchestration. Would require significant mentoring and structured learning path. Consider for junior role with extensive onboarding program."
  },
  {
    id: 5,
    name: "Neha Reddy",
    email: "neha.reddy@gmail.com",
    phone: "+91 54321 09876",
    location: "Pune, Maharashtra",
    role_alignment: "Data Engineer",
    skill_score: 81,
    project_depth: 79,
    consistency_score: 84,
    confidence_band: "High Potential",
    learning_gap: ["Real-time Processing", "MLOps"],
    status: "accepted",
    application_date: "2024-02-12",
    github: {
      url: "https://github.com/nehareddy",
      repos: 21,
      stars: 98,
      languages: { "Python": 60, "SQL": 25, "Scala": 10, "R": 5 },
      commits_90_days: 189,
      last_activity: "2024-02-18"
    },
    linkedin: "https://linkedin.com/in/nehareddy",
    resume: "resume_neha_reddy.pdf",
    resume_analysis: {
      ats_score: 83,
      skill_keywords: ["Python", "Spark", "Airflow", "PostgreSQL", "ETL"],
      project_quality: 82
    },
    role_match_scores: {
      "Data Engineer": 81,
      "Backend Developer": 74,
      "ML Engineer": 77
    },
    analysis: "Strong data engineering candidate with solid Python and SQL skills. GitHub projects demonstrate understanding of data pipelines and ETL processes. Good analytical thinking and problem-solving evident from project complexity. Would benefit from exposure to real-time streaming systems and MLOps practices. Excellent cultural fit and team collaboration potential."
  },
  {
    id: 6,
    name: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    phone: "+91 43210 98765",
    location: "Delhi, NCR",
    role_alignment: "Mobile Developer",
    skill_score: 74,
    project_depth: 71,
    consistency_score: 69,
    confidence_band: "Medium",
    learning_gap: ["Native iOS", "Performance", "Testing"],
    status: "pending",
    application_date: "2024-02-15",
    github: {
      url: "https://github.com/vikramsingh",
      repos: 12,
      stars: 34,
      languages: { "Swift": 45, "Kotlin": 30, "Dart": 20, "JavaScript": 5 },
      commits_90_days: 142,
      last_activity: "2024-02-17"
    },
    linkedin: "https://linkedin.com/in/vikramsingh",
    resume: "resume_vikram_singh.pdf",
    resume_analysis: {
      ats_score: 72,
      skill_keywords: ["Flutter", "React Native", "Swift", "API Integration"],
      project_quality: 74
    },
    role_match_scores: {
      "Mobile Developer": 74,
      "Frontend Developer": 68,
      "Full Stack Developer": 65
    },
    analysis: "Competent mobile developer with cross-platform experience. Comfortable with Flutter and React Native, showing adaptability across frameworks. GitHub activity indicates regular but not intensive development. Projects lack depth in native iOS development and performance optimization. Would benefit from focused training on mobile-specific best practices and native development."
  },
  {
    id: 7,
    name: "Divya Nair",
    email: "divya.nair@gmail.com",
    phone: "+91 32109 87654",
    location: "Kolkata, West Bengal",
    role_alignment: "Full Stack Developer",
    skill_score: 89,
    project_depth: 86,
    consistency_score: 92,
    confidence_band: "High Potential",
    learning_gap: ["GraphQL", "Microservices"],
    status: "in_review",
    application_date: "2024-02-14",
    github: {
      url: "https://github.com/divyanair",
      repos: 26,
      stars: 178,
      languages: { "JavaScript": 35, "TypeScript": 30, "Python": 25, "Rust": 10 },
      commits_90_days: 268,
      last_activity: "2024-02-19"
    },
    linkedin: "https://linkedin.com/in/divyanair",
    resume: "resume_divya_nair.pdf",
    resume_analysis: {
      ats_score: 88,
      skill_keywords: ["React", "Node.js", "Express", "MongoDB", "Redis"],
      project_quality: 90
    },
    role_match_scores: {
      "Full Stack Developer": 89,
      "Backend Developer": 84,
      "Frontend Developer": 87
    },
    analysis: "Exceptional full-stack engineer with strong technical foundation across frontend and backend. GitHub shows high-quality, well-documented projects with modern tech stack. Demonstrates excellent problem-solving skills and architectural thinking. Active contributor with consistent delivery. Minimal learning gaps - primarily needs exposure to GraphQL and microservices architecture."
  },
  {
    id: 8,
    name: "Rohan Mehta",
    email: "rohan.mehta@gmail.com",
    phone: "+91 21098 76543",
    location: "Ahmedabad, Gujarat",
    role_alignment: "Backend Developer",
    skill_score: 70,
    project_depth: 68,
    consistency_score: 65,
    confidence_band: "Medium",
    learning_gap: ["Caching", "Security", "Testing", "Documentation"],
    status: "pending",
    application_date: "2024-02-16",
    github: {
      url: "https://github.com/rohanmehta",
      repos: 10,
      stars: 23,
      languages: { "Python": 55, "JavaScript": 25, "Go": 15, "SQL": 5 },
      commits_90_days: 95,
      last_activity: "2024-02-15"
    },
    linkedin: "https://linkedin.com/in/rohanmehta",
    resume: "resume_rohan_mehta.pdf",
    resume_analysis: {
      ats_score: 68,
      skill_keywords: ["Python", "Django", "PostgreSQL", "REST API"],
      project_quality: 66
    },
    role_match_scores: {
      "Backend Developer": 70,
      "Full Stack Developer": 64,
      "Data Engineer": 67
    },
    analysis: "Decent backend developer with Python/Django foundation. GitHub projects show basic CRUD applications and REST API development. Code quality is acceptable but lacks sophistication in caching strategies and security implementations. Testing coverage appears minimal. Would benefit from structured mentoring on backend best practices and production-ready code patterns."
  },
  {
    id: 9,
    name: "Kavita Joshi",
    email: "kavita.joshi@gmail.com",
    phone: "+91 10987 65432",
    location: "Jaipur, Rajasthan",
    role_alignment: "Frontend Developer",
    skill_score: 85,
    project_depth: 83,
    consistency_score: 88,
    confidence_band: "High Potential",
    learning_gap: ["State Management", "Testing"],
    status: "pending",
    application_date: "2024-02-17",
    github: {
      url: "https://github.com/kavitajoshi",
      repos: 19,
      stars: 124,
      languages: { "TypeScript": 50, "JavaScript": 30, "CSS": 15, "HTML": 5 },
      commits_90_days: 201,
      last_activity: "2024-02-18"
    },
    linkedin: "https://linkedin.com/in/kavitajoshi",
    resume: "resume_kavita_joshi.pdf",
    resume_analysis: {
      ats_score: 84,
      skill_keywords: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
      project_quality: 86
    },
    role_match_scores: {
      "Frontend Developer": 85,
      "Full Stack Developer": 78,
      "UI/UX Developer": 82
    },
    analysis: "Strong frontend developer with modern React/Next.js expertise. GitHub demonstrates clean code practices and good component architecture. Projects show attention to user experience and responsive design. Consistent contributor with growing technical maturity. Would benefit from deeper understanding of complex state management patterns and comprehensive testing strategies."
  },
  {
    id: 10,
    name: "Sanjay Kumar",
    email: "sanjay.kumar@gmail.com",
    phone: "+91 99876 54321",
    location: "Lucknow, Uttar Pradesh",
    role_alignment: "DevOps Engineer",
    skill_score: 76,
    project_depth: 73,
    consistency_score: 79,
    confidence_band: "Medium",
    learning_gap: ["Kubernetes", "Terraform", "Monitoring"],
    status: "rejected",
    application_date: "2024-02-11",
    github: {
      url: "https://github.com/sanjaykumar",
      repos: 14,
      stars: 38,
      languages: { "Python": 40, "Shell": 30, "YAML": 20, "Go": 10 },
      commits_90_days: 156,
      last_activity: "2024-02-14"
    },
    linkedin: "https://linkedin.com/in/sanjaykumar",
    resume: "resume_sanjay_kumar.pdf",
    resume_analysis: {
      ats_score: 74,
      skill_keywords: ["Docker", "Jenkins", "AWS", "Linux", "Ansible"],
      project_quality: 71
    },
    role_match_scores: {
      "DevOps Engineer": 76,
      "Backend Developer": 68,
      "System Administrator": 72
    },
    analysis: "Developing DevOps engineer with Docker and CI/CD basics. GitHub shows automation scripts and infrastructure projects. Lacks deep Kubernetes experience and infrastructure-as-code expertise. Monitoring and observability knowledge appears limited. Projects are functional but not production-grade. Rejected due to immediate need for senior-level Kubernetes expertise, but could be reconsidered for junior role."
  },
  {
    id: 11,
    name: "Meera Krishnan",
    email: "meera.krishnan@gmail.com",
    phone: "+91 88765 43210",
    location: "Coimbatore, Tamil Nadu",
    role_alignment: "Full Stack Developer",
    skill_score: 83,
    project_depth: 80,
    consistency_score: 86,
    confidence_band: "High Potential",
    learning_gap: ["WebSocket", "Caching"],
    status: "pending",
    application_date: "2024-02-18",
    github: {
      url: "https://github.com/meerakrishnan",
      repos: 23,
      stars: 142,
      languages: { "JavaScript": 40, "TypeScript": 30, "Python": 20, "CSS": 10 },
      commits_90_days: 223,
      last_activity: "2024-02-19"
    },
    linkedin: "https://linkedin.com/in/meerakrishnan",
    resume: "resume_meera_krishnan.pdf",
    resume_analysis: {
      ats_score: 82,
      skill_keywords: ["React", "Node.js", "PostgreSQL", "Docker", "Git"],
      project_quality: 84
    },
    role_match_scores: {
      "Full Stack Developer": 83,
      "Frontend Developer": 81,
      "Backend Developer": 78
    },
    analysis: "Promising full-stack developer with balanced frontend/backend skills. GitHub activity shows consistent high-quality contributions. Projects demonstrate good understanding of web architecture and API design. Strong documentation and code organization. Would benefit from real-time communication patterns (WebSockets) and caching strategies for performance optimization."
  },
  {
    id: 12,
    name: "Karthik Menon",
    email: "karthik.menon@gmail.com",
    phone: "+91 77654 32109",
    location: "Kochi, Kerala",
    role_alignment: "Backend Developer",
    skill_score: 79,
    project_depth: 76,
    consistency_score: 81,
    confidence_band: "Medium",
    learning_gap: ["Distributed Systems", "Message Queues"],
    status: "in_review",
    application_date: "2024-02-17",
    github: {
      url: "https://github.com/karthikmenon",
      repos: 16,
      stars: 67,
      languages: { "Go": 50, "Python": 30, "JavaScript": 15, "SQL": 5 },
      commits_90_days: 174,
      last_activity: "2024-02-18"
    },
    linkedin: "https://linkedin.com/in/karthikmenon",
    resume: "resume_karthik_menon.pdf",
    resume_analysis: {
      ats_score: 77,
      skill_keywords: ["Go", "PostgreSQL", "REST API", "Docker", "Redis"],
      project_quality: 78
    },
    role_match_scores: {
      "Backend Developer": 79,
      "Full Stack Developer": 72,
      "DevOps Engineer": 70
    },
    analysis: "Solid backend developer with strong Go programming skills. GitHub shows well-structured API projects and good understanding of database interactions. Code is clean and follows best practices. Lacks experience with distributed systems and asynchronous processing patterns. Would thrive with mentorship on scalable architecture and message-driven systems."
  },
  {
    id: 13,
    name: "Pooja Agarwal",
    email: "pooja.agarwal@gmail.com",
    phone: "+91 66543 21098",
    location: "Indore, Madhya Pradesh",
    role_alignment: "Frontend Developer",
    skill_score: 68,
    project_depth: 65,
    consistency_score: 70,
    confidence_band: "Medium",
    learning_gap: ["Component Libraries", "Accessibility", "Performance"],
    status: "pending",
    application_date: "2024-02-15",
    github: {
      url: "https://github.com/poojaagarwal",
      repos: 11,
      stars: 29,
      languages: { "JavaScript": 55, "HTML": 25, "CSS": 15, "TypeScript": 5 },
      commits_90_days: 118,
      last_activity: "2024-02-16"
    },
    linkedin: "https://linkedin.com/in/poojaagarwal",
    resume: "resume_pooja_agarwal.pdf",
    resume_analysis: {
      ats_score: 66,
      skill_keywords: ["React", "CSS", "JavaScript", "Responsive Design"],
      project_quality: 67
    },
    role_match_scores: {
      "Frontend Developer": 68,
      "UI/UX Developer": 70,
      "Full Stack Developer": 61
    },
    analysis: "Junior frontend developer with basic React knowledge. GitHub projects show simple applications with room for improvement in code organization. Limited experience with modern frontend tooling and component libraries. Accessibility considerations appear minimal. Would benefit from structured learning program focusing on modern frontend practices, component architecture, and web accessibility standards."
  },
  {
    id: 14,
    name: "Aditya Verma",
    email: "aditya.verma@gmail.com",
    phone: "+91 55432 10987",
    location: "Nagpur, Maharashtra",
    role_alignment: "Full Stack Developer",
    skill_score: 91,
    project_depth: 89,
    consistency_score: 94,
    confidence_band: "High Potential",
    learning_gap: ["Cloud Architecture"],
    status: "accepted",
    application_date: "2024-02-13",
    github: {
      url: "https://github.com/adityaverma",
      repos: 31,
      stars: 234,
      languages: { "TypeScript": 40, "Python": 25, "Go": 20, "Rust": 15 },
      commits_90_days: 289,
      last_activity: "2024-02-19"
    },
    linkedin: "https://linkedin.com/in/adityaverma",
    resume: "resume_aditya_verma.pdf",
    resume_analysis: {
      ats_score: 93,
      skill_keywords: ["React", "Node.js", "GraphQL", "PostgreSQL", "Docker", "TypeScript"],
      project_quality: 92
    },
    role_match_scores: {
      "Full Stack Developer": 91,
      "Backend Developer": 88,
      "Frontend Developer": 89
    },
    analysis: "Outstanding full-stack engineer with exceptional technical depth. GitHub demonstrates mastery across multiple languages and frameworks. Projects show sophisticated architecture, clean code, and excellent documentation. Very active contributor with consistent high-quality output. Minimal learning gaps - primarily needs cloud architecture experience for enterprise-scale systems. Top-tier candidate."
  },
  {
    id: 15,
    name: "Shreya Deshmukh",
    email: "shreya.deshmukh@gmail.com",
    phone: "+91 44321 09876",
    location: "Nashik, Maharashtra",
    role_alignment: "Data Engineer",
    skill_score: 77,
    project_depth: 74,
    consistency_score: 80,
    confidence_band: "Medium",
    learning_gap: ["Spark", "Data Modeling", "ETL Optimization"],
    status: "pending",
    application_date: "2024-02-16",
    github: {
      url: "https://github.com/shreyadeshmukh",
      repos: 13,
      stars: 51,
      languages: { "Python": 65, "SQL": 25, "R": 8, "Shell": 2 },
      commits_90_days: 147,
      last_activity: "2024-02-17"
    },
    linkedin: "https://linkedin.com/in/shreyadeshmukh",
    resume: "resume_shreya_deshmukh.pdf",
    resume_analysis: {
      ats_score: 75,
      skill_keywords: ["Python", "Pandas", "SQL", "ETL", "Data Visualization"],
      project_quality: 76
    },
    role_match_scores: {
      "Data Engineer": 77,
      "Backend Developer": 69,
      "Data Analyst": 82
    },
    analysis: "Competent data engineer with strong Python/SQL foundation. GitHub projects show data pipeline work and analysis scripts. Good understanding of data transformation but lacks experience with big data tools like Spark. Data modeling skills need development for enterprise-scale systems. Would benefit from exposure to production data infrastructure and optimization techniques."
  },
  {
    id: 16,
    name: "Harsh Vardhan",
    email: "harsh.vardhan@gmail.com",
    phone: "+91 33210 98765",
    location: "Bhopal, Madhya Pradesh",
    role_alignment: "Mobile Developer",
    skill_score: 72,
    project_depth: 69,
    consistency_score: 75,
    confidence_band: "Medium",
    learning_gap: ["Native Development", "App Store Optimization", "Analytics"],
    status: "pending",
    application_date: "2024-02-14",
    github: {
      url: "https://github.com/harshvardhan",
      repos: 9,
      stars: 31,
      languages: { "Dart": 50, "Swift": 30, "Kotlin": 15, "JavaScript": 5 },
      commits_90_days: 132,
      last_activity: "2024-02-16"
    },
    linkedin: "https://linkedin.com/in/harshvardhan",
    resume: "resume_harsh_vardhan.pdf",
    resume_analysis: {
      ats_score: 70,
      skill_keywords: ["Flutter", "Firebase", "REST API", "Mobile UI"],
      project_quality: 71
    },
    role_match_scores: {
      "Mobile Developer": 72,
      "Frontend Developer": 66,
      "Full Stack Developer": 63
    },
    analysis: "Mid-level mobile developer with Flutter focus. GitHub shows several mobile app projects with decent UI/UX. Limited native development experience could be limiting factor. App architecture is basic but functional. Would benefit from deep-dive into iOS/Android native platforms, performance optimization, and professional app deployment practices."
  },
  {
    id: 17,
    name: "Tanvi Bhatia",
    email: "tanvi.bhatia@gmail.com",
    phone: "+91 22109 87654",
    location: "Chandigarh, Punjab",
    role_alignment: "Backend Developer",
    skill_score: 86,
    project_depth: 84,
    consistency_score: 89,
    confidence_band: "High Potential",
    learning_gap: ["Event-Driven Architecture"],
    status: "in_review",
    application_date: "2024-02-18",
    github: {
      url: "https://github.com/tanvibhatia",
      repos: 24,
      stars: 167,
      languages: { "Python": 45, "Go": 30, "JavaScript": 15, "Rust": 10 },
      commits_90_days: 241,
      last_activity: "2024-02-19"
    },
    linkedin: "https://linkedin.com/in/tanvibhatia",
    resume: "resume_tanvi_bhatia.pdf",
    resume_analysis: {
      ats_score: 87,
      skill_keywords: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "AWS"],
      project_quality: 88
    },
    role_match_scores: {
      "Backend Developer": 86,
      "Full Stack Developer": 81,
      "DevOps Engineer": 78
    },
    analysis: "Excellent backend developer with strong technical skills and clean code practices. GitHub demonstrates expertise in API development, database design, and system architecture. Projects are well-documented and production-ready. Active contributor with high-quality output. Primary learning gap is event-driven architecture - would be valuable addition to team with minimal onboarding."
  },
  {
    id: 18,
    name: "Yash Thakur",
    email: "yash.thakur@gmail.com",
    phone: "+91 11098 76543",
    location: "Surat, Gujarat",
    role_alignment: "DevOps Engineer",
    skill_score: 69,
    project_depth: 66,
    consistency_score: 71,
    confidence_band: "Medium",
    learning_gap: ["Container Orchestration", "IaC", "Security", "Cost Optimization"],
    status: "pending",
    application_date: "2024-02-15",
    github: {
      url: "https://github.com/yashthakur",
      repos: 10,
      stars: 24,
      languages: { "Python": 45, "Shell": 35, "YAML": 15, "Go": 5 },
      commits_90_days: 103,
      last_activity: "2024-02-15"
    },
    linkedin: "https://linkedin.com/in/yashthakur",
    resume: "resume_yash_thakur.pdf",
    resume_analysis: {
      ats_score: 67,
      skill_keywords: ["Docker", "AWS", "Linux", "CI/CD", "Monitoring"],
      project_quality: 68
    },
    role_match_scores: {
      "DevOps Engineer": 69,
      "Backend Developer": 62,
      "System Administrator": 74
    },
    analysis: "Entry-to-mid level DevOps engineer with basic cloud and containerization knowledge. GitHub shows automation scripts and simple deployment pipelines. Lacks depth in Kubernetes, infrastructure-as-code (Terraform/CloudFormation), and security best practices. Would require structured learning path and mentorship to reach production-ready capabilities. Consider for junior DevOps role."
  },
  {
    id: 19,
    name: "Ishita Malhotra",
    email: "ishita.malhotra@gmail.com",
    phone: "+91 99887 65432",
    location: "Visakhapatnam, Andhra Pradesh",
    role_alignment: "Frontend Developer",
    skill_score: 88,
    project_depth: 85,
    consistency_score: 91,
    confidence_band: "High Potential",
    learning_gap: ["Advanced Animations", "PWA"],
    status: "pending",
    application_date: "2024-02-19",
    github: {
      url: "https://github.com/ishitamalhotra",
      repos: 27,
      stars: 198,
      languages: { "TypeScript": 45, "JavaScript": 30, "CSS": 20, "HTML": 5 },
      commits_90_days: 264,
      last_activity: "2024-02-19"
    },
    linkedin: "https://linkedin.com/in/ishitamalhotra",
    resume: "resume_ishita_malhotra.pdf",
    resume_analysis: {
      ats_score: 89,
      skill_keywords: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      project_quality: 90
    },
    role_match_scores: {
      "Frontend Developer": 88,
      "Full Stack Developer": 83,
      "UI/UX Developer": 86
    },
    analysis: "Outstanding frontend developer with exceptional skills in modern React ecosystem. GitHub demonstrates sophisticated component architecture, excellent TypeScript usage, and strong UI/UX sensibilities. Projects showcase attention to detail and performance optimization. Very active contributor with consistently high-quality code. Minimal learning gaps - primarily advanced animation techniques and PWA development."
  },
  {
    id: 20,
    name: "Rajeshwari Rao",
    email: "rajeshwari.rao@gmail.com",
    phone: "+91 88776 54321",
    location: "Mysore, Karnataka",
    role_alignment: "Full Stack Developer",
    skill_score: 75,
    project_depth: 72,
    consistency_score: 78,
    confidence_band: "Medium",
    learning_gap: ["TypeScript", "Testing", "CI/CD", "Security"],
    status: "pending",
    application_date: "2024-02-17",
    github: {
      url: "https://github.com/rajeshwarirao",
      repos: 14,
      stars: 45,
      languages: { "JavaScript": 50, "Python": 30, "HTML": 12, "CSS": 8 },
      commits_90_days: 139,
      last_activity: "2024-02-17"
    },
    linkedin: "https://linkedin.com/in/rajeshwarirao",
    resume: "resume_rajeshwari_rao.pdf",
    resume_analysis: {
      ats_score: 73,
      skill_keywords: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
      project_quality: 74
    },
    role_match_scores: {
      "Full Stack Developer": 75,
      "Frontend Developer": 73,
      "Backend Developer": 71
    },
    analysis: "Competent full-stack developer with JavaScript focus. GitHub projects show MERN stack applications with basic functionality. Code quality is acceptable but lacks TypeScript adoption and comprehensive testing. Security considerations appear minimal. Would benefit from modernizing skill set with TypeScript, implementing robust testing practices, and learning secure coding patterns."
  }
];

export const mockStats: DashboardStats = {
  total_applications: 20,
  new_this_week: 5,
  pending_review: 12,
  accepted: 2,
  rejected: 1
};

export const mockAdminUser = {
  id: "admin-1",
  name: "Ravi Kumar",
  email: "ravi.kumar@iats.com",
  role: "admin" as const,
  avatar: undefined
};
