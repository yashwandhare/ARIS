import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '../components/StatusBadge';
import { SkillLevelBadge } from '../components/SkillLevelBadge';
import { SubmissionForm } from '../components/SubmissionForm';
import { getTaskById, Task } from '../data/mockInternData';
import { 
  ArrowLeft, 
  Calendar, 
  ExternalLink, 
  Circle,
  Award,
  MessageSquare
} from 'lucide-react';

export function TaskDetailPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(() => getTaskById(taskId || '') || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!task) {
    return (
      <div className="p-8">
        <Button variant="outline" onClick={() => navigate('/intern/tasks')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tasks
        </Button>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-serif font-semibold text-charcoal-800">
            Task not found
          </h2>
        </div>
      </div>
    );
  }

  const handleSubmit = (githubUrl: string, notes: string) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setTask({
        ...task,
        status: 'submitted',
        githubUrl,
        notes,
        submittedAt: new Date().toISOString().split('T')[0],
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const daysUntilDeadline = Math.ceil(
    (new Date(task.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="p-8 space-y-6 custom-scrollbar overflow-y-auto h-full bg-cream pb-16">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/intern/tasks')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Badge variant="outline">Week {task.week}</Badge>
            <StatusBadge status={task.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="flat-card">
            <CardHeader>
              <CardTitle className="text-2xl">{task.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-charcoal-500 mt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {task.status === 'reviewed' || task.status === 'submitted'
                      ? `Submitted: ${new Date(task.submittedAt!).toLocaleDateString()}`
                      : `Due: ${new Date(task.deadline).toLocaleDateString()}`
                    }
                  </span>
                </div>
                {task.status !== 'reviewed' && task.status !== 'submitted' && (
                  <span className={daysUntilDeadline < 0 ? 'text-orange' : ''}>
                    {daysUntilDeadline < 0 
                      ? `${Math.abs(daysUntilDeadline)} days overdue`
                      : `${daysUntilDeadline} days remaining`
                    }
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-charcoal-700 mb-2">
                  Description
                </h3>
                <p className="text-charcoal-600 leading-relaxed">
                  {task.description}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-charcoal-700 mb-3">
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {task.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-charcoal-600">
                      <Circle className="h-2 w-2 text-sky mt-1.5 fill-sky shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-charcoal-700">Skill Level:</span>
                <SkillLevelBadge level={task.skillLevel} />
              </div>
            </CardContent>
          </Card>

          {task.status === 'reviewed' && task.feedback && (
            <Card className="flat-card border-lime">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-lime" />
                  <CardTitle className="text-lg">Review Feedback</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-serif font-bold text-charcoal-800">
                    {task.score}
                  </div>
                  <div className="text-sm text-charcoal-500">
                    <p>Score</p>
                    <p>out of 100</p>
                  </div>
                </div>
                <div className="bg-cream-200 rounded-lg p-4">
                  <p className="text-sm text-charcoal-700 leading-relaxed">
                    {task.feedback}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {task.status !== 'reviewed' && (
            <Card className="flat-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-charcoal-500" />
                  <CardTitle className="text-lg">Submission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <SubmissionForm 
                  task={task} 
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="flat-card">
            <CardHeader>
              <CardTitle className="text-base">Recommended Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {task.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg bg-cream-200 hover:bg-cream-300 transition-colors group"
                >
                  <ExternalLink className="h-4 w-4 text-charcoal-400 group-hover:text-sky" />
                  <span className="text-sm text-charcoal-700 group-hover:text-charcoal-800">
                    {resource.title}
                  </span>
                </a>
              ))}
            </CardContent>
          </Card>

          <Card className="flat-card bg-sky/5 border-sky/30">
            <CardContent className="p-4">
              <h4 className="text-sm font-semibold text-charcoal-700 mb-2">
                Tips for Success
              </h4>
              <ul className="space-y-2 text-xs text-charcoal-600">
                <li>• Read all requirements carefully before starting</li>
                <li>• Test your implementation thoroughly</li>
                <li>• Add clear documentation in your README</li>
                <li>• Follow coding best practices</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
