import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ApplicationFormSchema } from '../schemas/applicationSchema';
import { DEGREE_OPTIONS } from '../types';

interface EducationSectionProps {
  register: UseFormRegister<ApplicationFormSchema>;
  errors: FieldErrors<ApplicationFormSchema>;
  setValue: UseFormSetValue<ApplicationFormSchema>;
  watch: UseFormWatch<ApplicationFormSchema>;
}

export function EducationSection({ register, errors, setValue, watch }: EducationSectionProps) {
  return (
    <Card className="flat-card">
      <CardHeader>
        <CardTitle className="text-xl">Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal-700">
              Degree / Education Level <span className="text-orange">*</span>
            </label>
            <Select
              onValueChange={(value) => setValue('education.degree', value)}
              defaultValue={watch('education.degree')}
            >
              <SelectTrigger className={errors.education?.degree ? 'border-orange' : ''}>
                <SelectValue placeholder="Select your degree" />
              </SelectTrigger>
              <SelectContent>
                {DEGREE_OPTIONS.map((degree) => (
                  <SelectItem key={degree} value={degree}>
                    {degree}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.education?.degree && (
              <p className="text-sm text-orange">{errors.education.degree.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal-700">
              Field of Study <span className="text-orange">*</span>
            </label>
            <Input
              {...register('education.fieldOfStudy')}
              placeholder="Computer Science"
              className={errors.education?.fieldOfStudy ? 'border-orange' : ''}
            />
            {errors.education?.fieldOfStudy && (
              <p className="text-sm text-orange">{errors.education.fieldOfStudy.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-charcoal-700">
            Institution Name <span className="text-orange">*</span>
          </label>
          <Input
            {...register('education.institution')}
            placeholder="University of Example"
            className={errors.education?.institution ? 'border-orange' : ''}
          />
          {errors.education?.institution && (
            <p className="text-sm text-orange">{errors.education.institution.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal-700">
              Graduation Year <span className="text-orange">*</span>
            </label>
            <Input
              {...register('education.graduationYear', { valueAsNumber: true })}
              type="number"
              min="1950"
              max="2030"
              placeholder="2024"
              className={errors.education?.graduationYear ? 'border-orange' : ''}
            />
            {errors.education?.graduationYear && (
              <p className="text-sm text-orange">{errors.education.graduationYear.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal-700">
              CGPA (out of 10) <span className="text-charcoal-400">(Optional)</span>
            </label>
            <Input
              {...register('education.gpa')}
              placeholder="8.5"
              className={errors.education?.gpa ? 'border-orange' : ''}
            />
            {errors.education?.gpa && (
              <p className="text-sm text-orange">{errors.education.gpa.message}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
