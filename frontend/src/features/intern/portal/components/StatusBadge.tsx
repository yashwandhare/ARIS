import { TaskStatus } from '../data/mockInternData';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: TaskStatus;
}

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-sky/30 text-charcoal-800 border border-sky/50',
  },
  submitted: {
    label: 'Submitted',
    className: 'bg-cream-200 text-charcoal-700 border border-charcoal-200',
  },
  reviewed: {
    label: 'Reviewed',
    className: 'bg-lime/30 text-charcoal-800 border border-lime/50',
  },
  overdue: {
    label: 'Overdue',
    className: 'bg-orange/30 text-charcoal-800 border border-orange/50',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
}
