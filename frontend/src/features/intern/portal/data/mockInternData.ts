export type TaskStatus = 'pending' | 'submitted' | 'reviewed' | 'overdue';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Task {
  id: string;
  title: string;
  description: string;
  week: number;
  deadline: string;
  status: TaskStatus;
  score?: number;
  feedback?: string;
  requirements: string[];
  skillLevel: SkillLevel;
  resources: { title: string; url: string }[];
  submittedAt?: string;
  githubUrl?: string;
  notes?: string;
}

export interface WeekPlan {
  week: number;
  title: string;
  topics: string[];
  objectives: string[];
  requiredSkills: string[];
  expectedOutput: string;
  evaluationCriteria: string[];
}

export interface InternProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  location: string;
  programDuration: number;
  startDate: string;
  mentor: string;
  completionPercentage: number;
  currentWeek: number;
  averageScore: number;
  strengths: string[];
  areasToImprove: string[];
}

export interface ScoreProgress {
  week: number;
  score: number;
}

export const mockInternProfile: InternProfile = {
  id: 'intern-001',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@xyztech.com',
  role: 'Backend Developer Intern',
  location: 'Pune, Maharashtra',
  programDuration: 8,
  startDate: '2026-01-01',
  mentor: 'Ravi Kumar',
  completionPercentage: 37.5,
  currentWeek: 3,
  averageScore: 78,
  strengths: ['API Design', 'Code Quality', 'Documentation'],
  areasToImprove: ['Database Optimization', 'Testing Coverage', 'Error Handling'],
};

export const mockTasks: Task[] = [
  {
    id: 'task-001',
    title: 'Setup Development Environment',
    description: 'Configure your local development environment with Node.js, PostgreSQL, and necessary tools. Create a basic project structure for the internship.',
    week: 1,
    deadline: '2026-01-07',
    status: 'reviewed',
    score: 85,
    feedback: 'Excellent setup with clear documentation. Consider adding environment variable management for better security practices.',
    requirements: [
      'Install Node.js v18+ and npm',
      'Setup PostgreSQL database locally',
      'Configure ESLint and Prettier',
      'Create project directory structure',
      'Document setup instructions in README',
    ],
    skillLevel: 'beginner',
    resources: [
      { title: 'Node.js Installation Guide', url: 'https://nodejs.org/en/download/' },
      { title: 'PostgreSQL Setup', url: 'https://www.postgresql.org/docs/current/tutorial-install.html' },
    ],
    submittedAt: '2026-01-05',
    githubUrl: 'https://github.com/aaravsharma/internship-setup',
    notes: 'Completed all requirements. Ready for review.',
  },
  {
    id: 'task-002',
    title: 'Build Basic REST API',
    description: 'Create a simple REST API using Express.js with CRUD operations for a user management system. Implement proper error handling and response formatting.',
    week: 1,
    deadline: '2026-01-10',
    status: 'reviewed',
    score: 78,
    feedback: 'Good implementation of CRUD operations. API responses are well-structured. Add input validation for production readiness.',
    requirements: [
      'Create Express.js server',
      'Implement GET, POST, PUT, DELETE endpoints',
      'Use proper HTTP status codes',
      'Add error handling middleware',
      'Test all endpoints with Postman',
    ],
    skillLevel: 'beginner',
    resources: [
      { title: 'Express.js Guide', url: 'https://expressjs.com/en/guide/routing.html' },
      { title: 'REST API Best Practices', url: 'https://restfulapi.net/' },
    ],
    submittedAt: '2026-01-09',
    githubUrl: 'https://github.com/aaravsharma/user-api',
    notes: 'All CRUD operations working. Error handling implemented.',
  },
  {
    id: 'task-003',
    title: 'Implement Authentication Middleware',
    description: 'Build JWT-based authentication middleware for your API. Implement user login, token generation, and route protection.',
    week: 2,
    deadline: '2026-01-17',
    status: 'reviewed',
    score: 72,
    feedback: 'JWT implementation is functional. Need to improve token refresh logic and add rate limiting for security.',
    requirements: [
      'Implement user registration and login',
      'Generate and validate JWT tokens',
      'Create middleware for protected routes',
      'Add password hashing with bcrypt',
      'Implement token expiration',
    ],
    skillLevel: 'intermediate',
    resources: [
      { title: 'JWT.io Introduction', url: 'https://jwt.io/introduction' },
      { title: 'Express Middleware', url: 'https://expressjs.com/en/guide/using-middleware.html' },
    ],
    submittedAt: '2026-01-16',
    githubUrl: 'https://github.com/aaravsharma/auth-middleware',
    notes: 'Basic JWT auth working. Need to add refresh tokens later.',
  },
  {
    id: 'task-004',
    title: 'Connect API to PostgreSQL',
    description: 'Integrate PostgreSQL database with your API. Create proper models, migrations, and implement database connection pooling.',
    week: 2,
    deadline: '2026-01-20',
    status: 'reviewed',
    score: 81,
    feedback: 'Well-structured database integration. Connection pooling implemented correctly. Consider adding query optimization for large datasets.',
    requirements: [
      'Setup PostgreSQL connection with pg library',
      'Create database schema for users table',
      'Implement connection pooling',
      'Add database migrations',
      'Test with sample data',
    ],
    skillLevel: 'intermediate',
    resources: [
      { title: 'PostgreSQL with Node.js', url: 'https://node-postgres.com/' },
      { title: 'Database Migrations', url: 'https://salsita.github.io/node-pg-migrate/' },
    ],
    submittedAt: '2026-01-19',
    githubUrl: 'https://github.com/aaravsharma/db-integration',
    notes: 'All endpoints working with database. Added basic migrations.',
  },
  {
    id: 'task-005',
    title: 'Build CRUD for Task Management',
    description: 'Create a complete task management module with CRUD operations. Include filtering, pagination, and search functionality.',
    week: 3,
    deadline: '2026-01-27',
    status: 'submitted',
    requirements: [
      'Create tasks table schema',
      'Implement CRUD endpoints for tasks',
      'Add filtering by status and priority',
      'Implement pagination',
      'Add search functionality',
    ],
    skillLevel: 'intermediate',
    resources: [
      { title: 'API Pagination', url: 'https://nordicapis.com/everything-you-wanted-to-know-about-api-pagination/' },
      { title: 'SQL Search', url: 'https://www.postgresql.org/docs/current/functions-matching.html' },
    ],
    submittedAt: '2026-01-26',
    githubUrl: 'https://github.com/aaravsharma/task-module',
    notes: 'All CRUD operations complete. Pagination and filtering implemented.',
  },
  {
    id: 'task-006',
    title: 'Add Unit Tests',
    description: 'Write comprehensive unit tests for your API using Jest. Achieve at least 70% code coverage for the core modules.',
    week: 3,
    deadline: '2026-01-30',
    status: 'pending',
    requirements: [
      'Setup Jest testing framework',
      'Write tests for auth middleware',
      'Write tests for CRUD operations',
      'Test error handling scenarios',
      'Generate coverage report',
    ],
    skillLevel: 'intermediate',
    resources: [
      { title: 'Jest Documentation', url: 'https://jestjs.io/docs/getting-started' },
      { title: 'Testing Express Apps', url: 'https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/' },
    ],
  },
  {
    id: 'task-007',
    title: 'Implement Rate Limiting',
    description: 'Add rate limiting middleware to protect your API from abuse. Configure different limits for authenticated and unauthenticated users.',
    week: 4,
    deadline: '2026-02-05',
    status: 'pending',
    requirements: [
      'Install express-rate-limit',
      'Configure global rate limiting',
      'Add stricter limits for auth endpoints',
      'Log rate limit violations',
      'Test with multiple requests',
    ],
    skillLevel: 'intermediate',
    resources: [
      { title: 'Express Rate Limit', url: 'https://github.com/nfriedly/express-rate-limit' },
      { title: 'API Security Best Practices', url: 'https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html' },
    ],
  },
  {
    id: 'task-008',
    title: 'API Documentation with Swagger',
    description: 'Create comprehensive API documentation using Swagger/OpenAPI. Document all endpoints with request/response examples.',
    week: 4,
    deadline: '2026-02-08',
    status: 'overdue',
    requirements: [
      'Install swagger-jsdoc and swagger-ui-express',
      'Document all API endpoints',
      'Add request/response schemas',
      'Include authentication details',
      'Test documentation UI',
    ],
    skillLevel: 'beginner',
    resources: [
      { title: 'Swagger with Express', url: 'https://swagger.io/specification/' },
      { title: 'OpenAPI Guide', url: 'https://swagger.io/tools/open-source/getting-started/' },
    ],
  },
];

export const mockWeekPlans: WeekPlan[] = [
  {
    week: 1,
    title: 'Backend Foundations',
    topics: [
      'HTTP basics and request/response cycle',
      'REST principles and API design',
      'Express.js introduction',
      'Project structure best practices',
    ],
    objectives: [
      'Understand HTTP protocol fundamentals',
      'Design simple RESTful APIs',
      'Set up a Node.js project from scratch',
      'Implement basic CRUD operations',
    ],
    requiredSkills: ['JavaScript', 'Basic Node.js'],
    expectedOutput: 'A working Express.js server with basic CRUD endpoints',
    evaluationCriteria: [
      'Code organization and structure',
      'Proper use of HTTP methods and status codes',
      'Error handling implementation',
      'Documentation quality',
    ],
  },
  {
    week: 2,
    title: 'API Development',
    topics: [
      'Advanced CRUD operations',
      'Input validation and sanitization',
      'Middleware patterns',
      'JWT authentication',
    ],
    objectives: [
      'Implement secure authentication',
      'Validate and sanitize user input',
      'Create reusable middleware',
      'Connect to PostgreSQL database',
    ],
    requiredSkills: ['Express.js basics', 'SQL fundamentals'],
    expectedOutput: 'Authenticated API with database integration',
    evaluationCriteria: [
      'Security best practices',
      'Database design quality',
      'Middleware architecture',
      'Token handling implementation',
    ],
  },
  {
    week: 3,
    title: 'Testing & Quality',
    topics: [
      'Unit testing with Jest',
      'Integration testing',
      'Code coverage',
      'Test-driven development basics',
    ],
    objectives: [
      'Write comprehensive unit tests',
      'Achieve 70%+ code coverage',
      'Implement integration tests',
      'Practice TDD methodology',
    ],
    requiredSkills: ['Express.js development', 'Testing concepts'],
    expectedOutput: 'Well-tested API with coverage reports',
    evaluationCriteria: [
      'Test coverage percentage',
      'Test quality and assertions',
      'Edge case handling',
      'Testing documentation',
    ],
  },
  {
    week: 4,
    title: 'Security & Performance',
    topics: [
      'Rate limiting and throttling',
      'Input validation advanced',
      'SQL injection prevention',
      'API documentation',
    ],
    objectives: [
      'Implement security best practices',
      'Protect against common vulnerabilities',
      'Document all API endpoints',
      'Optimize query performance',
    ],
    requiredSkills: ['Testing basics', 'Security awareness'],
    expectedOutput: 'Secure, well-documented API',
    evaluationCriteria: [
      'Security implementation quality',
      'Documentation completeness',
      'Performance optimizations',
      'Error handling robustness',
    ],
  },
  {
    week: 5,
    title: 'Advanced Database',
    topics: [
      'Complex queries and joins',
      'Database indexing',
      'Transactions and ACID',
      'Query optimization',
    ],
    objectives: [
      'Write complex SQL queries',
      'Implement database indexing',
      'Handle transactions properly',
      'Optimize slow queries',
    ],
    requiredSkills: ['SQL basics', 'Database design'],
    expectedOutput: 'Optimized database layer with complex queries',
    evaluationCriteria: [
      'Query efficiency',
      'Index strategy',
      'Transaction handling',
      'Performance benchmarks',
    ],
  },
  {
    week: 6,
    title: 'Caching & Performance',
    topics: [
      'Redis caching',
      'Cache invalidation strategies',
      'Response compression',
      'Load testing basics',
    ],
    objectives: [
      'Implement Redis caching',
      'Reduce response times',
      'Handle cache invalidation',
      'Perform load testing',
    ],
    requiredSkills: ['Redis basics', 'Performance concepts'],
    expectedOutput: 'High-performance API with caching layer',
    evaluationCriteria: [
      'Cache hit rate',
      'Response time improvements',
      'Cache invalidation correctness',
      'Load test results',
    ],
  },
  {
    week: 7,
    title: 'Microservices Basics',
    topics: [
      'Service decomposition',
      'Inter-service communication',
      'API gateway concepts',
      'Service discovery',
    ],
    objectives: [
      'Understand microservices architecture',
      'Implement service communication',
      'Design an API gateway',
      'Handle service failures gracefully',
    ],
    requiredSkills: ['API development', 'Docker basics'],
    expectedOutput: 'Multiple communicating services',
    evaluationCriteria: [
      'Service boundaries',
      'Communication patterns',
      'Error handling across services',
      'Architecture documentation',
    ],
  },
  {
    week: 8,
    title: 'Final Project',
    topics: [
      'Project integration',
      'Final testing',
      'Documentation review',
      'Presentation preparation',
    ],
    objectives: [
      'Integrate all learned concepts',
      'Complete final testing',
      'Prepare comprehensive documentation',
      'Present your project',
    ],
    requiredSkills: ['All previous weeks'],
    expectedOutput: 'Complete, production-ready API project',
    evaluationCriteria: [
      'Code quality and organization',
      'Test coverage',
      'Documentation completeness',
      'Presentation quality',
    ],
  },
];

export const mockScoreProgress: ScoreProgress[] = [
  { week: 1, score: 82 },
  { week: 2, score: 77 },
  { week: 3, score: 76 },
];

export const mockCertificate = {
  id: 'CERT-XYZ-2026-001',
  internName: 'Aarav Sharma',
  role: 'Backend Developer Intern',
  program: 'Internship & Structured Training Program',
  startDate: 'January 1, 2026',
  endDate: 'February 28, 2026',
  completionDate: 'February 28, 2026',
  issuedBy: 'XYZ Technologies',
  mentorName: 'Ravi Kumar',
  skills: ['REST API Development', 'Node.js', 'PostgreSQL', 'Authentication', 'Testing'],
};

export function getTasksByWeek(): Record<number, Task[]> {
  const grouped: Record<number, Task[]> = {};
  mockTasks.forEach(task => {
    if (!grouped[task.week]) {
      grouped[task.week] = [];
    }
    grouped[task.week].push(task);
  });
  return grouped;
}

export function getPendingTasks(): Task[] {
  return mockTasks.filter(t => t.status === 'pending' || t.status === 'overdue');
}

export function getSubmittedTasks(): Task[] {
  return mockTasks.filter(t => t.status === 'submitted');
}

export function getReviewedTasks(): Task[] {
  return mockTasks.filter(t => t.status === 'reviewed');
}

export function getTaskById(id: string): Task | undefined {
  return mockTasks.find(t => t.id === id);
}

export function getCurrentWeekTasks(week: number): Task[] {
  return mockTasks.filter(t => t.week === week);
}

export function calculateOverallProgress(): number {
  const total = mockTasks.length;
  const completed = mockTasks.filter(t => t.status === 'reviewed').length;
  return Math.round((completed / total) * 100);
}
