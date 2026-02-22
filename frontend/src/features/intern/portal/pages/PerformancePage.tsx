import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockInternProfile, mockScoreProgress, mockTasks } from '../data/mockInternData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Award, Target, AlertTriangle } from 'lucide-react';

export function PerformancePage() {
  const profile = mockInternProfile;
  const reviewedTasks = mockTasks.filter(t => t.status === 'reviewed');
  const totalTasks = mockTasks.length;
  const completedTasks = reviewedTasks.length;

  return (
    <div className="p-8 space-y-8 custom-scrollbar overflow-y-auto h-full bg-cream pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-serif font-bold text-charcoal-800">
          Performance
        </h1>
        <p className="text-base text-charcoal-500">
          Track your progress and identify areas for improvement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flat-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-sky/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-sky" />
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-charcoal-800">
                  {profile.averageScore}
                </p>
                <p className="text-sm text-charcoal-500">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flat-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-lime/20 flex items-center justify-center">
                <Award className="h-6 w-6 text-lime" />
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-charcoal-800">
                  {Math.round((completedTasks / totalTasks) * 100)}%
                </p>
                <p className="text-sm text-charcoal-500">Tasks Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flat-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-orange" />
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-charcoal-800">
                  {completedTasks}/{totalTasks}
                </p>
                <p className="text-sm text-charcoal-500">Tasks Reviewed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="flat-card">
        <CardHeader>
          <CardTitle>Score Progression</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockScoreProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#CCCCCC" />
                <XAxis 
                  dataKey="week" 
                  stroke="#3D3D3D" 
                  tickFormatter={(value) => `Week ${value}`}
                  style={{ fontSize: '12px', fontWeight: '500' }}
                />
                <YAxis 
                  stroke="#3D3D3D" 
                  domain={[0, 100]}
                  style={{ fontSize: '12px', fontWeight: '500' }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value}`, 'Score']}
                  labelFormatter={(label) => `Week ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8ACBE1" 
                  strokeWidth={3}
                  dot={{ fill: '#8ACBE1', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-charcoal-500 mt-4 text-center">
            Your score progression across completed weeks
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flat-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-lime" />
              <CardTitle>Strengths</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.strengths.map((strength, idx) => (
                <Badge key={idx} className="bg-lime/30 text-charcoal-800 border border-lime/50">
                  {strength}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-charcoal-500 mt-4">
              Skills where you demonstrate strong performance
            </p>
          </CardContent>
        </Card>

        <Card className="flat-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange" />
              <CardTitle>Areas to Improve</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.areasToImprove.map((area, idx) => (
                <Badge key={idx} className="bg-orange/30 text-charcoal-800 border border-orange/50">
                  {area}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-charcoal-500 mt-4">
              Focus areas for your continued growth
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="flat-card">
        <CardHeader>
          <CardTitle>Task Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviewedTasks.map((task) => (
              <div 
                key={task.id}
                className="flex items-center justify-between p-4 rounded-lg bg-cream-200"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-charcoal-800 truncate">
                    {task.title}
                  </p>
                  <p className="text-xs text-charcoal-500">Week {task.week}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-cream-300 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        (task.score || 0) >= 80 
                          ? 'bg-lime' 
                          : (task.score || 0) >= 60 
                            ? 'bg-sky' 
                            : 'bg-orange'
                      }`}
                      style={{ width: `${task.score}%` }}
                    />
                  </div>
                  <span className="text-lg font-serif font-bold text-charcoal-800 w-12 text-right">
                    {task.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
