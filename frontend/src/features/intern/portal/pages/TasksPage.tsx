import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TaskCard } from '../components/TaskCard';
import { mockTasks, getTasksByWeek, Task, TaskStatus } from '../data/mockInternData';
import { ChevronDown, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FilterStatus = 'all' | TaskStatus;

export function TasksPage() {
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([3]);

  const tasksByWeek = getTasksByWeek();
  const weeks = Object.keys(tasksByWeek).map(Number).sort((a, b) => a - b);

  const filteredTasksByWeek = weeks.reduce((acc, week) => {
    const tasks = tasksByWeek[week];
    const filtered = statusFilter === 'all' 
      ? tasks 
      : tasks.filter(t => t.status === statusFilter);
    if (filtered.length > 0) {
      acc[week] = filtered;
    }
    return acc;
  }, {} as Record<number, Task[]>);

  const toggleWeek = (week: number) => {
    setExpandedWeeks(prev => 
      prev.includes(week) 
        ? prev.filter(w => w !== week) 
        : [...prev, week]
    );
  };

  const statusCounts = mockTasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<TaskStatus, number>);

  return (
    <div className="p-8 space-y-8 custom-scrollbar overflow-y-auto h-full bg-cream pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-serif font-bold text-charcoal-800">
          My Tasks
        </h1>
        <p className="text-base text-charcoal-500">
          Track and complete your assigned tasks week by week.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-charcoal-500" />
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as FilterStatus)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="pending">Pending ({statusCounts['pending'] || 0})</SelectItem>
              <SelectItem value="submitted">Submitted ({statusCounts['submitted'] || 0})</SelectItem>
              <SelectItem value="reviewed">Reviewed ({statusCounts['reviewed'] || 0})</SelectItem>
              <SelectItem value="overdue">Overdue ({statusCounts['overdue'] || 0})</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 text-sm text-charcoal-500">
          <span>{mockTasks.length} total tasks</span>
        </div>
      </div>

      <div className="space-y-6">
        {weeks.map((week) => {
          const weekTasks = filteredTasksByWeek[week];
          if (!weekTasks || weekTasks.length === 0) return null;

          const isExpanded = expandedWeeks.includes(week);
          const completedCount = weekTasks.filter(t => t.status === 'reviewed').length;

          return (
            <Card key={week} className="flat-card">
              <CardHeader 
                className="cursor-pointer py-4"
                onClick={() => toggleWeek(week)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-base px-4 py-1">
                      Week {week}
                    </Badge>
                    <div className="text-sm text-charcoal-500">
                      {completedCount} / {weekTasks.length} completed
                    </div>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 text-charcoal-400 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {weekTasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {Object.keys(filteredTasksByWeek).length === 0 && (
        <Card className="flat-card">
          <CardContent className="py-12 text-center">
            <p className="text-charcoal-500">No tasks match the selected filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
