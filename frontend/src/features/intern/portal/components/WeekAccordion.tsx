import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WeekPlan } from '../data/mockInternData';
import { cn } from '@/lib/utils';

interface WeekAccordionProps {
  weeks: WeekPlan[];
  currentWeek: number;
}

export function WeekAccordion({ weeks, currentWeek }: WeekAccordionProps) {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(currentWeek);

  const toggleWeek = (week: number) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  const getWeekStatus = (week: number): 'completed' | 'current' | 'upcoming' => {
    if (week < currentWeek) return 'completed';
    if (week === currentWeek) return 'current';
    return 'upcoming';
  };

  return (
    <div className="space-y-4">
      {weeks.map((weekPlan) => {
        const status = getWeekStatus(weekPlan.week);
        const isExpanded = expandedWeek === weekPlan.week;

        return (
          <Card 
            key={weekPlan.week}
            className={cn(
              "flat-card transition-all",
              status === 'current' && "border-sky border-2",
              status === 'completed' && "border-lime"
            )}
          >
            <CardHeader 
              className="cursor-pointer py-4"
              onClick={() => toggleWeek(weekPlan.week)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    status === 'completed' && "bg-lime/20",
                    status === 'current' && "bg-sky/20",
                    status === 'upcoming' && "bg-cream-200"
                  )}>
                    {status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-lime" />
                    ) : (
                      <span className="text-sm font-bold text-charcoal-700">
                        {weekPlan.week}
                      </span>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base text-charcoal-800">
                      Week {weekPlan.week} – {weekPlan.title}
                    </CardTitle>
                    <p className="text-xs text-charcoal-500 mt-1">
                      {weekPlan.topics.length} topics • {weekPlan.objectives.length} objectives
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {status === 'current' && (
                    <Badge className="bg-sky/30 text-charcoal-800 border border-sky/50">
                      Current
                    </Badge>
                  )}
                  {status === 'completed' && (
                    <Badge className="bg-lime/30 text-charcoal-800 border border-lime/50">
                      Completed
                    </Badge>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-charcoal-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-charcoal-400" />
                  )}
                </div>
              </div>
            </CardHeader>
            
            {isExpanded && (
              <CardContent className="pt-0 pb-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-charcoal-700 mb-3">
                    Learning Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {weekPlan.topics.map((topic, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-charcoal-700 mb-3">
                    Learning Objectives
                  </h4>
                  <ul className="space-y-2">
                    {weekPlan.objectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-charcoal-600">
                        <Circle className="h-2 w-2 text-sky mt-1.5 fill-sky shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-charcoal-700 mb-3">
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {weekPlan.requiredSkills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-cream-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-charcoal-700 mb-2">
                    Expected Output
                  </h4>
                  <p className="text-sm text-charcoal-600 bg-cream-200 rounded-lg p-3">
                    {weekPlan.expectedOutput}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-charcoal-700 mb-3">
                    Evaluation Criteria
                  </h4>
                  <ul className="space-y-2">
                    {weekPlan.evaluationCriteria.map((criteria, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-charcoal-600">
                        <span className="text-sky font-medium">{idx + 1}.</span>
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
