import { SkillLevel } from '../data/mockInternData';
import { Badge } from '@/components/ui/badge';

interface SkillLevelBadgeProps {
  level: SkillLevel;
}

const levelConfig: Record<SkillLevel, { label: string; className: string }> = {
  beginner: {
    label: 'Beginner',
    className: 'bg-cream-200 text-charcoal-600 border border-charcoal-200',
  },
  intermediate: {
    label: 'Intermediate',
    className: 'bg-sky/20 text-charcoal-700 border border-sky/40',
  },
  advanced: {
    label: 'Advanced',
    className: 'bg-charcoal-800 text-cream border border-charcoal-700',
  },
};

export function SkillLevelBadge({ level }: SkillLevelBadgeProps) {
  const config = levelConfig[level];
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
