import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProgressSummaryProps {
  completionPercentage: number;
  currentWeek: number;
  pendingTasks: number;
  averageScore: number;
  totalWeeks: number;
}

export function ProgressSummary({
  completionPercentage,
  currentWeek,
  pendingTasks,
  averageScore,
  totalWeeks,
}: ProgressSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="flat-card-hover">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-charcoal-600">
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-serif font-bold text-charcoal-800">
            {completionPercentage}%
          </div>
          <div className="mt-3 h-2 bg-cream-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="flat-card-hover">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-charcoal-600">
            Current Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-serif font-bold text-charcoal-800">
              {currentWeek}
            </span>
            <span className="text-lg text-charcoal-500">/ {totalWeeks}</span>
          </div>
          <p className="text-xs text-charcoal-500 mt-2">
            Week in progress
          </p>
        </CardContent>
      </Card>

      <Card className="flat-card-hover">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-charcoal-600">
            Pending Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-serif font-bold text-charcoal-800">
            {pendingTasks}
          </div>
          <p className="text-xs text-charcoal-500 mt-2">
            Awaiting completion
          </p>
        </CardContent>
      </Card>

      <Card className="flat-card-hover">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-charcoal-600">
            Average Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-serif font-bold text-charcoal-800">
              {averageScore}
            </span>
            <span className="text-sm text-charcoal-500">/100</span>
          </div>
          <p className="text-xs text-charcoal-500 mt-2">
            Across reviewed tasks
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
