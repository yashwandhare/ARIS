import { z } from 'zod';

const githubUrlRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/;

export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits')
    .regex(/^[+]?[0-9\s-()]+$/, 'Please enter a valid phone number')
    .trim(),
  age: z
    .number()
    .int('Age must be a whole number')
    .min(18, 'You must be at least 18 years old')
    .max(65, 'Age must be less than 65'),
  location: z
    .string()
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location must not exceed 100 characters')
    .trim(),
  availabilityHoursPerDay: z
    .number()
    .min(1, 'Minimum 1 hour per day required')
    .max(12, 'Maximum 12 hours per day'),
});

export const professionalProfileSchema = z.object({
  githubUrl: z
    .string()
    .url('Please enter a valid URL')
    .regex(githubUrlRegex, 'Please enter a valid GitHub profile URL (e.g., https://github.com/username)')
    .trim(),
  linkedinUrl: z
    .string()
    .url('Please enter a valid LinkedIn URL')
    .optional()
    .or(z.literal(''))
    .transform(val => val || undefined),
  portfolioUrl: z
    .string()
    .url('Please enter a valid portfolio URL')
    .optional()
    .or(z.literal(''))
    .transform(val => val || undefined),
  primaryTechStack: z
    .array(z.string())
    .min(1, 'Please select at least one technology')
    .max(10, 'Please select at most 10 technologies'),
  yearsOfExperience: z
    .number()
    .min(0, 'Years of experience cannot be negative')
    .max(50, 'Years of experience seems too high'),
  currentStatus: z
    .string()
    .min(1, 'Please select your current status'),
});

export const educationSchema = z.object({
  degree: z
    .string()
    .min(1, 'Please select your degree level'),
  fieldOfStudy: z
    .string()
    .min(2, 'Field of study must be at least 2 characters')
    .max(100, 'Field of study must not exceed 100 characters')
    .trim(),
  institution: z
    .string()
    .min(2, 'Institution name must be at least 2 characters')
    .max(200, 'Institution name must not exceed 200 characters')
    .trim(),
  graduationYear: z
    .number()
    .int('Graduation year must be a whole number')
    .min(1950, 'Graduation year must be after 1950')
    .max(2030, 'Graduation year must be before 2030'),
  gpa: z
    .string()
    .max(10, 'CGPA must not exceed 10 characters')
    .optional()
    .or(z.literal(''))
    .transform(val => val || undefined)
    .refine(
      (val) => {
        if (!val) return true;
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0 && num <= 10;
      },
      { message: 'CGPA must be a number between 0 and 10' }
    ),
});

export const projectLinkSchema = z.object({
  url: z
    .string()
    .url('Please enter a valid project URL')
    .trim(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(300, 'Description must not exceed 300 characters')
    .trim(),
});

export const experienceSchema = z.object({
  hasPreviousInternship: z.boolean(),
  company: z
    .string()
    .max(100, 'Company name must not exceed 100 characters')
    .optional()
    .or(z.literal(''))
    .transform(val => val || undefined),
  duration: z
    .string()
    .max(50, 'Duration must not exceed 50 characters')
    .optional()
    .or(z.literal(''))
    .transform(val => val || undefined),
  projectLinks: z
    .array(projectLinkSchema)
    .min(2, 'Please provide at least 2 project links')
    .max(5, 'Maximum 5 project links allowed'),
});

export const motivationSchema = z.object({
  whyApplying: z
    .string()
    .max(1000, 'Response must not exceed 1000 characters')
    .optional()
    .or(z.literal(''))
    .transform(val => val?.trim() || ''),
  areasToImprove: z
    .string()
    .max(1000, 'Response must not exceed 1000 characters')
    .optional()
    .or(z.literal(''))
    .transform(val => val?.trim() || ''),
});

export const resumeSchema = z.object({
  file: z.instanceof(File).nullable(),
  fileName: z.string(),
  fileSize: z.number(),
}).refine(
  (data) => {
    if (!data.file) return false;
    return data.file.type === 'application/pdf';
  },
  { message: 'Resume must be a PDF file' }
).refine(
  (data) => {
    if (!data.file) return false;
    const maxSize = 5 * 1024 * 1024; // 5MB
    return data.file.size <= maxSize;
  },
  { message: 'Resume file size must not exceed 5MB' }
);

export const applicationFormSchema = z.object({
  roleSelected: z
    .string()
    .min(1, 'Please select a role to apply for'),
  personal: personalInfoSchema,
  professional: professionalProfileSchema,
  education: educationSchema,
  experience: experienceSchema,
  motivation: motivationSchema,
  resume: resumeSchema,
  termsAccepted: z
    .boolean()
    .refine(val => val === true, {
      message: 'You must accept the terms and conditions',
    }),
});

export type ApplicationFormSchema = z.infer<typeof applicationFormSchema>;
