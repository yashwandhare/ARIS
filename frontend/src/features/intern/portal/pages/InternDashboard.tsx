import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressSummary } from '../components/ProgressSummary';
import { TaskCard } from '../components/TaskCard';
import {
  mockInternProfile,
  getCurrentWeekTasks,
  getReviewedTasks,
  getPendingTasks,
  calculateOverallProgress,
} from '../data/mockInternData';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Target, Clock, Award } from 'lucide-react';

export function InternDashboard() {
  const navigate = useNavigate();
  const profile = mockInternProfile;
  const currentWeekTasks = getCurrentWeekTasks(profile.currentWeek);
  const reviewedTasks = getReviewedTasks().slice(-2);
  const pendingTasks = getPendingTasks();
  const progress = calculateOverallProgress();

  const currentTask = currentWeekTasks.find(t => t.status === 'pending') || currentWeekTasks[0];

  return (
    <div className="p-8 space-y-8 custom-scrollbar overflow-y-auto h-full bg-cream pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-serif font-bold text-charcoal-800">
          Welcome back, {profile.name.split(' ')[0]}
        </h1>
        <p className="text-base text-charcoal-500">
          Track your progress and continue your training journey.
        </p>
      </div>

      <ProgressSummary
        completionPercentage={progress}
        currentWeek={profile.currentWeek}
        pendingTasks={pendingTasks.length}
        averageScore={profile.averageScore}
        totalWeeks={profile.programDuration}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flat-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Current Focus</CardTitle>
              <Badge variant="outline">Week {profile.currentWeek}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {currentTask ? (
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-sky/20 flex items-center justify-center shrink-0">
                    <Target className="h-6 w-6 text-sky" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-charcoal-800">
                      {currentTask.title}
                    </h3>
                    <p className="text-sm text-charcoal-500 mt-1 line-clamp-2">
                      {currentTask.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-charcoal-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {Math.ceil((new Date(currentTask.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate(`/intern/tasks/${currentTask.id}`)}
                  className="w-full gap-2"
                >
                  View Task
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-charcoal-500">No pending tasks for this week</p>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/intern/tasks')}
                  className="mt-4"
                >
                  View All Tasks
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="flat-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Feedback</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/intern/performance')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {reviewedTasks.length > 0 ? (
              <div className="space-y-4">
                {reviewedTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="p-4 rounded-lg bg-cream-200 border border-charcoal-100 cursor-pointer hover:bg-cream-300 transition-colors"
                    onClick={() => navigate(`/intern/tasks/${task.id}`)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-charcoal-800 truncate">
                          {task.title}
                        </p>
                        <p className="text-sm text-charcoal-500 mt-1 line-clamp-1">
                          {task.feedback}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-xl font-serif font-bold text-charcoal-800">
                          {task.score}
                        </span>
                        <span className="text-xs text-charcoal-500">/100</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Award className="h-12 w-12 text-charcoal-300 mx-auto mb-3" />
                <p className="text-charcoal-500">No reviewed tasks yet</p>
                <p className="text-xs text-charcoal-400 mt-1">
                  Complete tasks to receive feedback
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {pendingTasks.length > 0 && (
        <Card className="flat-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
              <Button variant="outline" size="sm" onClick={() => navigate('/intern/tasks')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingTasks.slice(0, 3).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="flat-card bg-sky/5 border-sky/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-sky/20 flex items-center justify-center shrink-0">
              <Calendar className="h-6 w-6 text-sky" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-charcoal-800">Weekly Check-in</h3>
              <p className="text-sm text-charcoal-600">
                Your next check-in with {profile.mentor} is scheduled.
              </p>
            </div>
            <Button variant="outline">Schedule</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
