import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { applicationFormSchema, ApplicationFormSchema } from '../schemas/applicationSchema';
import { submitApplication } from '../services/submitApplication';
import { ApplicationFormData } from '../types';

export function useApplicationForm(selectedRole: string) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormSchema>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      roleSelected: selectedRole,
      personal: {
        fullName: '',
        email: '',
        phone: '',
        age: 18,
        location: '',
        availabilityHoursPerDay: 4,
      },
      professional: {
        githubUrl: '',
        linkedinUrl: '',
        portfolioUrl: '',
        primaryTechStack: [],
        yearsOfExperience: 0,
        currentStatus: '',
      },
      education: {
        degree: '',
        fieldOfStudy: '',
        institution: '',
        graduationYear: new Date().getFullYear(),
        gpa: '',
      },
      experience: {
        hasPreviousInternship: false,
        company: '',
        duration: '',
        projectLinks: [
          { url: '', description: '' },
          { url: '', description: '' },
        ],
      },
      motivation: {
        whyApplying: '',
        areasToImprove: '',
      },
      resume: {
        file: null,
        fileName: '',
        fileSize: 0,
      },
      termsAccepted: false,
    },
  });

  // Update role when prop changes
  useEffect(() => {
    setValue('roleSelected', selectedRole);
  }, [selectedRole, setValue]);

  const mutation = useMutation({
    mutationFn: (data: ApplicationFormData) => submitApplication(data),
    onError: (error: Error) => {
      setSubmitError(error.message || 'An unexpected error occurred. Please try again.');
      window.alert(error.message || 'An unexpected error occurred. Please try again.');
    },
  });

  const onSubmit = async (data: ApplicationFormSchema) => {
    setSubmitError(null);

    try {
      const result = await mutation.mutateAsync(data as ApplicationFormData);
      window.alert('Application submitted successfully.');
      return {
        success: true,
        applicationId: result.applicationId,
      };
    } catch (error) {
      console.error('Submission error:', error);
      return {
        success: false,
        applicationId: '',
      };
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    control,
    isSubmitting: isSubmitting || mutation.isPending,
    submitError,
    onSubmit,
  };
}
