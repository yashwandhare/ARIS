import { ApplicationFormData, ApplicationSubmission } from '../types';
import { createApplication } from '@/lib/api';

interface SubmissionResponse {
  success: boolean;
  applicationId: string;
  message: string;
}

/**
 * Submits the application to the backend
 * Mock implementation - in production, this would be a real API call
 */
export async function submitApplication(
  formData: ApplicationFormData
): Promise<SubmissionResponse> {
  // Transform form data to submission payload
  const payload: ApplicationSubmission = {
    id: '',
    role_selected: formData.roleSelected,
    personal: {
      ...formData.personal,
      fullName: formData.personal.fullName.trim(),
      email: formData.personal.email.toLowerCase().trim(),
      phone: formData.personal.phone.trim(),
      location: formData.personal.location.trim(),
    },
    professional: {
      ...formData.professional,
      githubUrl: formData.professional.githubUrl.trim(),
      linkedinUrl: formData.professional.linkedinUrl?.trim(),
      portfolioUrl: formData.professional.portfolioUrl?.trim(),
    },
    education: {
      ...formData.education,
      fieldOfStudy: formData.education.fieldOfStudy.trim(),
      institution: formData.education.institution.trim(),
    },
    experience: {
      ...formData.experience,
      company: formData.experience.company?.trim(),
      duration: formData.experience.duration?.trim(),
      projectLinks: formData.experience.projectLinks.map(link => ({
        url: link.url.trim(),
        description: link.description.trim(),
      })),
    },
    motivation: {
      whyApplying: formData.motivation.whyApplying.trim(),
      areasToImprove: formData.motivation.areasToImprove.trim(),
    },
    resume_filename: formData.resume.fileName,
    meta: {
      submitted_at: new Date().toISOString(),
      source: 'candidate_portal_v1',
    },
    status: 'pending',
  };

  const apiPayload = {
    full_name: payload.personal.fullName,
    email: payload.personal.email,
    github_url: payload.professional.githubUrl,
    role_applied: payload.role_selected,
    personal_json: JSON.stringify(payload.personal),
    education_json: JSON.stringify(payload.education),
    experience_json: JSON.stringify(payload.experience),
    professional_json: JSON.stringify(payload.professional),
    motivation_json: JSON.stringify(payload.motivation),
  };

  const resumeFile = formData.resume.file || undefined;
  const response = (await createApplication(apiPayload, resumeFile)) as any;

  return {
    success: true,
    applicationId: String(response.id ?? ''),
    message: 'Application submitted successfully',
  };
}

/**
 * Validates file before upload
 */
export function validateResumeFile(file: File): {
  isValid: boolean;
  error?: string;
} {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedType = 'application/pdf';

  if (file.type !== allowedType) {
    return {
      isValid: false,
      error: 'Only PDF files are allowed',
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size must not exceed 5MB',
    };
  }

  return { isValid: true };
}

/**
 * Sanitizes text input to prevent XSS
 */
export function sanitizeTextInput(text: string): string {
  return text
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 10000); // Limit length
}
