import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue, useFieldArray, Control } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ApplicationFormSchema } from '../schemas/applicationSchema';

interface ExperienceSectionProps {
  register: UseFormRegister<ApplicationFormSchema>;
  errors: FieldErrors<ApplicationFormSchema>;
  watch: UseFormWatch<ApplicationFormSchema>;
  setValue: UseFormSetValue<ApplicationFormSchema>;
  control: Control<ApplicationFormSchema>;
}

export function ExperienceSection({ 
  register, 
  errors, 
  watch, 
  setValue,
  control 
}: ExperienceSectionProps) {
  const hasPreviousInternship = watch('experience.hasPreviousInternship');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience.projectLinks',
  });

  const addProjectLink = () => {
    if (fields.length < 5) {
      append({ url: '', description: '' });
    }
  };

  return (
    <Card className="flat-card">
      <CardHeader>
        <CardTitle className="text-xl">Experience & Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-charcoal-700">
            Have you completed a previous internship? <span className="text-orange">*</span>
          </label>
          <div className="flex gap-4">
            <Button
              type="button"
              variant={hasPreviousInternship ? 'default' : 'outline'}
              onClick={() => setValue('experience.hasPreviousInternship', true)}
              className="flex-1"
            >
              Yes
            </Button>
            <Button
              type="button"
              variant={!hasPreviousInternship ? 'default' : 'outline'}
              onClick={() => setValue('experience.hasPreviousInternship', false)}
              className="flex-1"
            >
              No
            </Button>
          </div>
        </div>

        {hasPreviousInternship && (
          <div className="space-y-5 pt-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-charcoal-700">
                Company Name
              </label>
              <Input
                {...register('experience.company')}
                placeholder="Company Name"
                className={errors.experience?.company ? 'border-orange' : ''}
              />
              {errors.experience?.company && (
                <p className="text-sm text-orange">{errors.experience.company.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-charcoal-700">
                Duration
              </label>
              <Input
                {...register('experience.duration')}
                placeholder="e.g., 3 months, Jun 2023 - Aug 2023"
                className={errors.experience?.duration ? 'border-orange' : ''}
              />
              {errors.experience?.duration && (
                <p className="text-sm text-orange">{errors.experience.duration.message}</p>
              )}
            </div>
          </div>
        )}

        <div className="border-t border-charcoal-200 pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-charcoal-700">
                Project Links <span className="text-orange">*</span>
              </h3>
              <p className="text-xs text-charcoal-500 mt-1">
                Provide at least 2 project links (GitHub repos, live demos, etc.)
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              {fields.length} / 5
            </Badge>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flat-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-charcoal-700">
                    Project {index + 1}
                  </h4>
                  {fields.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-orange" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-charcoal-600">
                    Project URL <span className="text-orange">*</span>
                  </label>
                  <Input
                    {...register(`experience.projectLinks.${index}.url`)}
                    placeholder="https://github.com/username/project"
                    className={
                      errors.experience?.projectLinks?.[index]?.url ? 'border-orange' : ''
                    }
                  />
                  {errors.experience?.projectLinks?.[index]?.url && (
                    <p className="text-xs text-orange">
                      {errors.experience.projectLinks[index]?.url?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-charcoal-600">
                    Description <span className="text-orange">*</span>
                    <span className="text-charcoal-500 ml-1">(10-300 characters)</span>
                  </label>
                  <Input
                    {...register(`experience.projectLinks.${index}.description`)}
                    placeholder="Brief description of the project"
                    className={
                      errors.experience?.projectLinks?.[index]?.description
                        ? 'border-orange'
                        : ''
                    }
                  />
                  {errors.experience?.projectLinks?.[index]?.description && (
                    <p className="text-xs text-orange">
                      {errors.experience.projectLinks[index]?.description?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {errors.experience?.projectLinks && typeof errors.experience.projectLinks === 'object' && 'message' in errors.experience.projectLinks && (
            <p className="text-sm text-orange">{errors.experience.projectLinks.message}</p>
          )}

          {fields.length < 5 && (
            <Button
              type="button"
              variant="outline"
              onClick={addProjectLink}
              className="w-full gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Another Project
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
