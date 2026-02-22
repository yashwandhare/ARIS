import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { COMPANY_INFO } from '../constants';

interface HeroSectionProps {
  onApplyClick: () => void;
}

export function HeroSection({ onApplyClick }: HeroSectionProps) {
  return (
    <Card className="flat-card p-12 text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        <Badge variant="outline" className="gap-2 mb-4">
          <Sparkles className="h-3 w-3" />
          AI-Assisted Evaluation
        </Badge>

        <div className="space-y-3">
          <h1 className="text-5xl font-serif font-bold text-charcoal-800">
            {COMPANY_INFO.name}
          </h1>
          <h2 className="text-3xl font-serif font-semibold text-charcoal-700">
            {COMPANY_INFO.program.name}
          </h2>
        </div>

        <p className="text-lg text-charcoal-600 leading-relaxed">
          {COMPANY_INFO.program.description}
        </p>

        <div className="pt-4">
          <Button
            size="lg"
            onClick={onApplyClick}
            className="gap-2 text-base px-8 py-6"
          >
            Apply Now
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-charcoal-500 pt-2">
          Application takes approximately 15-20 minutes to complete
        </p>
      </div>
    </Card>
  );
}
