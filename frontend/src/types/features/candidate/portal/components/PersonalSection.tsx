import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ApplicationFormSchema } from '../schemas/applicationSchema';

interface PersonalSectionProps {
  register: UseFormRegister<ApplicationFormSchema>;
  errors: FieldErrors<ApplicationFormSchema>;
}

export function PersonalSection({ register, errors }: PersonalSectionProps) {
  return (
    <Card className="flat-card">
      <CardHeader>
        <CardTitle className="text-xl">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal-700">
              Full Name <span className="text-orange">*</span>
            </label>
            <Input
              {...register('personal.fullName')}
              placeholder="John Doe"
              className={errors.personal?.fullName ? 'border-orange' : ''}
            />
            {errors.personal?.fullName && (
              <p className="text-sm text-orange">{errors.personal.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal-700">
              Email Address <span className="text-orange">*</span>
            </label>
            <Input
              {...register('personal.email')}
              type="email"
              placeholder="john.doe@example.com"
              className={errors.personal?.email ? 'border-orange' : ''}
            />
            {errors.personal?.email && (
              <p className="text-sm text-orange">{errors.personal.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal-700">
              Phone Number <span className="text-orange">*</span>
            </label>
            <Input
              {...register('personal.phone')}
              type="tel"
              placeholder="+1 234 567 8900"
              className={errors.personal?.phone ? 'border-orange' : ''}
            />
            {errors.personal?.phone && (
              <p className="text-sm text-orange">{errors.personal.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal-700">
              Age <span className="text-orange">*</span>
            </label>
            <Input
              {...register('personal.age', { valueAsNumber: true })}
              type="number"
              min="18"
              max="65"
              placeholder="25"
              className={errors.personal?.age ? 'border-orange' : ''}
            />
            {errors.personal?.age && (
              <p className="text-sm text-orange">{errors.personal.age.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal-700">
              Location <span className="text-orange">*</span>
            </label>
            <Input
              {...register('personal.location')}
              placeholder="City, Country"
              className={errors.personal?.location ? 'border-orange' : ''}
            />
            {errors.personal?.location && (
              <p className="text-sm text-orange">{errors.personal.location.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-charcoal-700">
              Availability (hours/day) <span className="text-orange">*</span>
            </label>
            <Input
              {...register('personal.availabilityHoursPerDay', { valueAsNumber: true })}
              type="number"
              min="1"
              max="12"
              step="0.5"
              placeholder="4"
              className={errors.personal?.availabilityHoursPerDay ? 'border-orange' : ''}
            />
            {errors.personal?.availabilityHoursPerDay && (
              <p className="text-sm text-orange">
                {errors.personal.availabilityHoursPerDay.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
