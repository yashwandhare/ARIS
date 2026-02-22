export interface RoleOption {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  duration: string;
  commitment: string;
  location: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  availabilityHoursPerDay: number;
}

export interface ProfessionalProfile {
  githubUrl: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  primaryTechStack: string[];
  yearsOfExperience: number;
  currentStatus: string;
}

export interface Education {
  degree: string;
  fieldOfStudy: string;
  institution: string;
  graduationYear: number;
  gpa?: string;
}

export interface ProjectLink {
  url: string;
  description: string;
}

export interface Experience {
  hasPreviousInternship: boolean;
  company?: string;
  duration?: string;
  projectLinks: ProjectLink[];
}

export interface Motivation {
  whyApplying: string;
  areasToImprove: string;
}

export interface ResumeFile {
  file: File | null;
  fileName: string;
  fileSize: number;
}

export interface ApplicationFormData {
  roleSelected: string;
  personal: PersonalInfo;
  professional: ProfessionalProfile;
  education: Education;
  experience: Experience;
  motivation: Motivation;
  resume: ResumeFile;
  termsAccepted: boolean;
}

export interface ApplicationSubmission {
  id: string;
  role_selected: string;
  personal: PersonalInfo;
  professional: ProfessionalProfile;
  education: Education;
  experience: Experience;
  motivation: Motivation;
  resume_filename?: string;
  meta: {
    submitted_at: string;
    source: string;
  };
  status: 'pending';
}

export interface GitHubValidationResult {
  isValid: boolean;
  status: 'valid' | 'not_found' | 'no_repos' | 'error';
  message: string;
}

export const TECH_STACK_OPTIONS = [
  'TypeScript',
  'JavaScript',
  'Python',
  'Java',
  'Go',
  'Rust',
  'React',
  'Vue',
  'Angular',
  'Node.js',
  'Django',
  'Flask',
  'Spring Boot',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
] as const;

export const CURRENT_STATUS_OPTIONS = [
  'Student',
  'Recent Graduate',
  'Working Professional',
  'Between Jobs',
  'Freelancer',
] as const;

export const DEGREE_OPTIONS = [
  'High School',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'PhD',
  'Bootcamp Graduate',
  'Self-Taught',
] as const;
