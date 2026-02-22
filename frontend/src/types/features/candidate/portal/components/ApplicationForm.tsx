import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonalSection } from './PersonalSection';
import { ProfessionalSection } from './ProfessionalSection';
import { EducationSection } from './EducationSection';
import { ExperienceSection } from './ExperienceSection';
import { MotivationSection } from './MotivationSection';
import { ResumeUpload } from './ResumeUpload';
import { PreviewSection } from './PreviewSection';
import { useApplicationForm } from '../hooks/useApplicationForm';

interface ApplicationFormProps {
  selectedRole: string;
}

export function ApplicationForm({ selectedRole }: ApplicationFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState<string>('');

  const {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    control,
    isSubmitting,
    submitError,
    onSubmit: handleFormSubmit,
  } = useApplicationForm(selectedRole);

  const onSubmit = async (data: any) => {
    const result = await handleFormSubmit(data);
    if (result.success) {
      setApplicationId(result.applicationId);
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto" id="application-form">
        <div className="flat-card p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-lime/20 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-lime" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-serif font-bold text-charcoal-800">
              Application Submitted Successfully!
            </h2>
            <p className="text-lg text-charcoal-600">
              Thank you for applying to our internship program.
            </p>
          </div>

          <div className="bg-cream-200 rounded-lg p-6 space-y-3">
            <p className="text-sm font-medium text-charcoal-700">
              Application ID:
            </p>
            <code className="block text-sm font-mono bg-charcoal-800 text-cream px-4 py-2 rounded">
              {applicationId}
            </code>
            <p className="text-xs text-charcoal-500">
              Please save this ID for your records
            </p>
          </div>

          <div className="text-left bg-sky/10 border border-sky/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-charcoal-800">What happens next?</h3>
            <ul className="space-y-2 text-sm text-charcoal-700">
              <li className="flex items-start gap-2">
                <span className="text-sky mt-1">1.</span>
                <span>Our AI system will analyze your application and GitHub profile</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky mt-1">2.</span>
                <span>You'll receive an email notification within 2-3 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky mt-1">3.</span>
                <span>Selected candidates will be invited for the next round</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-charcoal-500">
            Check your email (including spam folder) for updates regarding your application.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" id="application-form">
      <div className="space-y-2">
        <h2 className="text-3xl font-serif font-bold text-charcoal-800">
          Application Form
        </h2>
        <p className="text-base text-charcoal-500">
          Complete all sections to submit your application
        </p>
      </div>

      {submitError && (
        <div className="flat-card p-4 bg-orange/10 border-orange">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-orange" />
            <div>
              <p className="text-sm font-medium text-charcoal-800">Submission Error</p>
              <p className="text-sm text-charcoal-700">{submitError}</p>
            </div>
          </div>
        </div>
      )}

      <PersonalSection register={register} errors={errors} />

      <ProfessionalSection
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
      />

      <EducationSection
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
      />

      <ExperienceSection
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
        control={control}
      />

      <MotivationSection register={register} errors={errors} watch={watch} />

      <ResumeUpload setValue={setValue} errors={errors} watch={watch} />

      <PreviewSection watch={watch} register={register} errors={errors} />

      <div className="flex justify-end gap-4 pt-6 border-t border-charcoal-200">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to Top
        </Button>
        <Button type="submit" size="lg" disabled={isSubmitting} className="gap-2 px-8">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </Button>
      </div>
    </form>
  );
}
