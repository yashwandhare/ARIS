import { useState, useEffect } from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { CheckCircle2, XCircle, Loader2, Github } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ApplicationFormSchema } from '../schemas/applicationSchema';
import { validateGitHubProfile, normalizeGitHubUrl } from '../services/githubValidation';
import { GitHubValidationResult, TECH_STACK_OPTIONS, CURRENT_STATUS_OPTIONS } from '../types';
import { useDebounce } from '../hooks/useDebounce';

interface ProfessionalSectionProps {
  register: UseFormRegister<ApplicationFormSchema>;
  errors: FieldErrors<ApplicationFormSchema>;
  watch: UseFormWatch<ApplicationFormSchema>;
  setValue: UseFormSetValue<ApplicationFormSchema>;
}

export function ProfessionalSection({ register, errors, watch, setValue }: ProfessionalSectionProps) {
  const githubUrl = watch('professional.githubUrl');
  const debouncedGithubUrl = useDebounce(githubUrl, 800);
  const [githubValidation, setGithubValidation] = useState<GitHubValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const selectedTechStack = watch('professional.primaryTechStack') || [];

  useEffect(() => {
    const validateGitHub = async () => {
      if (!debouncedGithubUrl || debouncedGithubUrl.length < 10) {
        setGithubValidation(null);
        return;
      }

      // Basic URL pattern check
      if (!debouncedGithubUrl.includes('github.com')) {
        setGithubValidation({
          isValid: false,
          status: 'error',
          message: 'Must be a GitHub URL',
        });
        return;
      }

      setIsValidating(true);
      try {
        const normalized = normalizeGitHubUrl(debouncedGithubUrl);
        const result = await validateGitHubProfile(normalized);
        setGithubValidation(result);
      } catch (error) {
        setGithubValidation({
          isValid: false,
          status: 'error',
          message: 'Validation failed',
        });
      } finally {
        setIsValidating(false);
      }
    };

    validateGitHub();
  }, [debouncedGithubUrl]);

  const toggleTechStack = (tech: string) => {
    const currentStack = selectedTechStack;
    if (currentStack.includes(tech)) {
      setValue('professional.primaryTechStack', currentStack.filter(t => t !== tech));
    } else {
      if (currentStack.length < 10) {
        setValue('professional.primaryTechStack', [...currentStack, tech]);
      }
    }
  };

  return (
    <Card className="flat-card">
      <CardHeader>
        <CardTitle className="text-xl">Professional Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-charcoal-700 flex items-center gap-2">
            <Github className="h-4 w-4" />
            GitHub Profile URL <span className="text-orange">*</span>
          </label>
          <div className="relative">
            <Input
              {...register('professional.githubUrl')}
              placeholder="https://github.com/username"
              className={errors.professional?.githubUrl ? 'border-orange' : ''}
            />
            {isValidating && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-sky" />
              </div>
            )}
          </div>
          {errors.professional?.githubUrl && (
            <p className="text-sm text-orange">{errors.professional.githubUrl.message}</p>
          )}
          {githubValidation && !isValidating && (
            <div className="flex items-center gap-2">
              {githubValidation.isValid ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-lime" />
                  <Badge variant="secondary" className="text-xs">
                    {githubValidation.message}
                  </Badge>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-orange" />
                  <Badge variant="destructive" className="text-xs">
                    {githubValidation.message}
                  </Badge>
                </>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal-700">
              LinkedIn Profile URL
            </label>
            <Input
              {...register('professional.linkedinUrl')}
              placeholder="https://linkedin.com/in/username"
              className={errors.professional?.linkedinUrl ? 'border-orange' : ''}
            />
            {errors.professional?.linkedinUrl && (
              <p className="text-sm text-orange">{errors.professional.linkedinUrl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal-700">
              Portfolio URL
            </label>
            <Input
              {...register('professional.portfolioUrl')}
              placeholder="https://yourportfolio.com"
              className={errors.professional?.portfolioUrl ? 'border-orange' : ''}
            />
            {errors.professional?.portfolioUrl && (
              <p className="text-sm text-orange">{errors.professional.portfolioUrl.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-charcoal-700">
            Primary Tech Stack <span className="text-orange">*</span>
            <span className="text-xs text-charcoal-500 ml-2">
              (Select 1-10 technologies)
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK_OPTIONS.map((tech) => (
              <Badge
                key={tech}
                variant={selectedTechStack.includes(tech) ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-charcoal-700 hover:text-cream transition-colors"
                onClick={() => toggleTechStack(tech)}
              >
                {tech}
              </Badge>
            ))}
          </div>
          {errors.professional?.primaryTechStack && (
            <p className="text-sm text-orange">{errors.professional.primaryTechStack.message}</p>
          )}
          <p className="text-xs text-charcoal-500">
            Selected: {selectedTechStack.length} / 10
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal-700">
              Years of Experience <span className="text-orange">*</span>
            </label>
            <Input
              {...register('professional.yearsOfExperience', { valueAsNumber: true })}
              type="number"
              min="0"
              max="50"
              step="0.5"
              placeholder="2"
              className={errors.professional?.yearsOfExperience ? 'border-orange' : ''}
            />
            {errors.professional?.yearsOfExperience && (
              <p className="text-sm text-orange">
                {errors.professional.yearsOfExperience.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal-700">
              Current Status <span className="text-orange">*</span>
            </label>
            <Select
              onValueChange={(value) => setValue('professional.currentStatus', value)}
              defaultValue={watch('professional.currentStatus')}
            >
              <SelectTrigger
                className={errors.professional?.currentStatus ? 'border-orange' : ''}
              >
                <SelectValue placeholder="Select your current status" />
              </SelectTrigger>
              <SelectContent>
                {CURRENT_STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.professional?.currentStatus && (
              <p className="text-sm text-orange">{errors.professional.currentStatus.message}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
