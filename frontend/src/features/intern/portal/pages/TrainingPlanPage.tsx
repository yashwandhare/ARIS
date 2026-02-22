import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeekAccordion } from '../components/WeekAccordion';
import { mockWeekPlans, mockInternProfile } from '../data/mockInternData';
import { BookOpen, Calendar } from 'lucide-react';

export function TrainingPlanPage() {
  const profile = mockInternProfile;
  const weekPlans = mockWeekPlans;

  return (
    <div className="p-8 space-y-8 custom-scrollbar overflow-y-auto h-full bg-cream pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-serif font-bold text-charcoal-800">
          Training Plan
        </h1>
        <p className="text-base text-charcoal-500">
          Your structured learning journey week by week.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flat-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-sky/20 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-sky" />
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-charcoal-800">
                  {profile.programDuration}
                </p>
                <p className="text-sm text-charcoal-500">Total Weeks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flat-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-lime/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-lime" />
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-charcoal-800">
                  Week {profile.currentWeek}
                </p>
                <p className="text-sm text-charcoal-500">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flat-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange/20 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-orange" />
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-charcoal-800">
                  {weekPlans.reduce((acc, w) => acc + w.topics.length, 0)}
                </p>
                <p className="text-sm text-charcoal-500">Total Topics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="flat-card">
        <CardHeader>
          <CardTitle>Program Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-charcoal-600 leading-relaxed">
            This {profile.programDuration}-week program is designed to transform your skills 
            in {profile.role.toLowerCase()}. Each week focuses on specific topics with clear 
            objectives, hands-on tasks, and evaluation criteria. Complete each week's tasks 
            to progress through the program.
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-serif font-semibold text-charcoal-800 mb-4">
          Weekly Curriculum
        </h2>
        <WeekAccordion weeks={weekPlans} currentWeek={profile.currentWeek} />
      </div>
    </div>
  );
}
