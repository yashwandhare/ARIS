import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ApplicationFormSchema } from '../schemas/applicationSchema';

interface MotivationSectionProps {
  register: UseFormRegister<ApplicationFormSchema>;
  errors: FieldErrors<ApplicationFormSchema>;
  watch: UseFormWatch<ApplicationFormSchema>;
}

export function MotivationSection({ register, errors, watch }: MotivationSectionProps) {
  const whyApplying = watch('motivation.whyApplying') || '';
  const areasToImprove = watch('motivation.areasToImprove') || '';

  return (
    <Card className="flat-card">
      <CardHeader>
        <CardTitle className="text-xl">Motivation & Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-charcoal-700">
            Why are you applying for this internship program? <span className="text-charcoal-400">(Optional)</span>
          </label>
          <textarea
            {...register('motivation.whyApplying')}
            rows={6}
            placeholder="Tell us what motivates you to apply for this position and what you hope to achieve..."
            className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.motivation?.whyApplying ? 'border-orange' : 'border-charcoal-300'
              } bg-cream-50 focus:outline-none focus:ring-2 focus:ring-sky/50 focus:ring-offset-2 resize-none`}
          />
          <div className="flex justify-between items-center">
            {errors.motivation?.whyApplying && (
              <p className="text-sm text-orange">{errors.motivation.whyApplying.message}</p>
            )}
            <p className={`text-xs ml-auto ${whyApplying.length > 1000 ? 'text-orange' : 'text-charcoal-500'}`}>
              {whyApplying.length} / 1000 characters
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-charcoal-700">
            What skills or areas do you want to improve? <span className="text-charcoal-400">(Optional)</span>
          </label>
          <textarea
            {...register('motivation.areasToImprove')}
            rows={6}
            placeholder="Describe the specific skills, technologies, or competencies you're looking to develop through this internship..."
            className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.motivation?.areasToImprove ? 'border-orange' : 'border-charcoal-300'
              } bg-cream-50 focus:outline-none focus:ring-2 focus:ring-sky/50 focus:ring-offset-2 resize-none`}
          />
          <div className="flex justify-between items-center">
            {errors.motivation?.areasToImprove && (
              <p className="text-sm text-orange">{errors.motivation.areasToImprove.message}</p>
            )}
            <p className={`text-xs ml-auto ${areasToImprove.length > 1000 ? 'text-orange' : 'text-charcoal-500'}`}>
              {areasToImprove.length} / 1000 characters
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
