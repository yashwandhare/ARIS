import { RoleOption } from './types';

export const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'backend',
    title: 'Backend Developer',
    description: 'Build scalable server-side applications and APIs with modern technologies',
    requirements: [
      'Strong understanding of RESTful APIs',
      'Experience with Node.js, Python, or Java',
      'Database knowledge (SQL/NoSQL)',
      'Understanding of authentication & security',
    ],
    duration: '3-6 months',
    commitment: '20-30 hours/week',
    location: 'Remote / Hybrid',
  },
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Create responsive and performant user interfaces using modern frameworks',
    requirements: [
      'Proficiency in React, Vue, or Angular',
      'Strong CSS and responsive design skills',
      'JavaScript/TypeScript expertise',
      'Understanding of web performance',
    ],
    duration: '3-6 months',
    commitment: '20-30 hours/week',
    location: 'Remote / Hybrid',
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    description: 'Work across the entire stack from database to user interface',
    requirements: [
      'Frontend framework experience',
      'Backend API development',
      'Database design & management',
      'DevOps basics (Docker, CI/CD)',
    ],
    duration: '3-6 months',
    commitment: '20-30 hours/week',
    location: 'Remote / Hybrid',
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    description: 'Automate infrastructure and optimize deployment pipelines',
    requirements: [
      'Linux/Unix administration',
      'Container orchestration (Docker, K8s)',
      'CI/CD pipeline experience',
      'Cloud platform knowledge (AWS/Azure/GCP)',
    ],
    duration: '3-6 months',
    commitment: '20-30 hours/week',
    location: 'Remote / Hybrid',
  },
  {
    id: 'data',
    title: 'Data Engineer',
    description: 'Build and maintain data pipelines and analytics infrastructure',
    requirements: [
      'SQL and database optimization',
      'Python or Scala for data processing',
      'ETL pipeline development',
      'Experience with data warehousing',
    ],
    duration: '3-6 months',
    commitment: '20-30 hours/week',
    location: 'Remote / Hybrid',
  },
  {
    id: 'mobile',
    title: 'Mobile Developer',
    description: 'Develop native or cross-platform mobile applications',
    requirements: [
      'iOS (Swift) or Android (Kotlin) experience',
      'Or React Native / Flutter',
      'Mobile UI/UX best practices',
      'API integration experience',
    ],
    duration: '3-6 months',
    commitment: '20-30 hours/week',
    location: 'Remote / Hybrid',
  },
];

export const COMPANY_INFO = {
  name: 'XYZ Technologies',
  tagline: 'Building the Future with Innovative Solutions',
  program: {
    name: 'Internship & Structured Training Program',
    description: 'Join our intensive training program designed to transform promising candidates into industry-ready professionals. Work on real-world projects, receive mentorship from experienced engineers, and gain hands-on experience with cutting-edge technologies.',
  },
};
