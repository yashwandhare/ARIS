import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task, TaskStatus } from '../data/mockInternData';
import { StatusBadge } from './StatusBadge';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface TaskCardProps {
  task: Task;
}

function getDaysUntilDeadline(deadline: string): number {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const diffTime = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getDeadlineDisplay(deadline: string, status: TaskStatus): string {
  if (status === 'reviewed' || status === 'submitted') {
    return 'Completed';
  }
  const days = getDaysUntilDeadline(deadline);
  if (days < 0) {
    return `${Math.abs(days)} days overdue`;
  }
  if (days === 0) {
    return 'Due today';
  }
  if (days === 1) {
    return 'Due tomorrow';
  }
  return `${days} days remaining`;
}

function getDeadlineColor(deadline: string, status: TaskStatus): string {
  if (status === 'reviewed' || status === 'submitted') {
    return 'text-charcoal-500';
  }
  const days = getDaysUntilDeadline(deadline);
  if (days < 0) {
    return 'text-orange';
  }
  if (days <= 2) {
    return 'text-orange';
  }
  return 'text-charcoal-500';
}

export function TaskCard({ task }: TaskCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="flat-card hover:border-charcoal-300 transition-colors cursor-pointer"
      onClick={() => navigate(`/intern/tasks/${task.id}`)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                Week {task.week}
              </Badge>
              <StatusBadge status={task.status} />
            </div>
            <CardTitle className="text-base text-charcoal-800 truncate">
              {task.title}
            </CardTitle>
          </div>
          {task.status === 'reviewed' && task.score !== undefined && (
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-2xl font-serif font-bold text-charcoal-800">
                {task.score}
              </span>
              <span className="text-xs text-charcoal-500">/100</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-charcoal-600 line-clamp-2 mb-3">
          {task.description}
        </p>
        <div className="flex items-center justify-between">
          <p className={`text-xs ${getDeadlineColor(task.deadline, task.status)}`}>
            {getDeadlineDisplay(task.deadline, task.status)}
          </p>
          {task.status === 'reviewed' && task.feedback && (
            <p className="text-xs text-charcoal-400 truncate max-w-[150px]">
              Feedback available
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
