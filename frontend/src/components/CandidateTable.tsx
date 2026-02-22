import { Eye, FileText, ChevronDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Candidate } from '@/types';
import { formatDate, getConfidenceColor } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface CandidateTableProps {
  candidates: Candidate[];
  showActions?: boolean;
  showMore?: boolean;
  onShowMore?: () => void;
  onGeneratePlan?: (candidate: Candidate) => void;
  /** ID of the top-ranked candidate — gets gold highlight */
  bestCandidateId?: number | null;
}

export function CandidateTable({
  candidates,
  showActions = true,
  showMore = false,
  onShowMore,
  onGeneratePlan,
  bestCandidateId = null,
}: CandidateTableProps) {
  const navigate = useNavigate();

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <Badge variant="secondary">{score}</Badge>;
    if (score >= 50) return <Badge variant="default">{score}</Badge>;
    return <Badge variant="destructive">{score}</Badge>;
  };

  const getConfidenceBadge = (band: string) => {
    const colorClass = getConfidenceColor(band);
    return <Badge className={colorClass}>{band}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: 'outline',
      in_review: 'default',
      accepted: 'secondary',
      rejected: 'destructive',
    };
    return (
      <Badge variant={variants[status] || 'outline'}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flat-card overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead className="bg-cream-200">
              <tr>
                <th className="text-left p-4 text-sm font-semibold uppercase text-charcoal-600">Name</th>
                <th className="text-left p-4 text-sm font-semibold uppercase text-charcoal-600">Role</th>
                <th className="text-left p-4 text-sm font-semibold uppercase text-charcoal-600">Score</th>
                <th className="text-left p-4 text-sm font-semibold uppercase text-charcoal-600">Confidence</th>
                <th className="text-left p-4 text-sm font-semibold uppercase text-charcoal-600">Date</th>
                <th className="text-left p-4 text-sm font-semibold uppercase text-charcoal-600">Status</th>
                {showActions && (
                  <th className="text-left p-4 text-sm font-semibold uppercase text-charcoal-600">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {candidates.length === 0 ? (
                <tr>
                  <td colSpan={showActions ? 7 : 6} className="text-center p-8 text-charcoal-500">
                    No candidates found
                  </td>
                </tr>
              ) : (
                candidates.map((candidate) => {
                  const isBest = bestCandidateId !== null && candidate.id === bestCandidateId;
                  return (
                    <tr
                      key={(candidate as any).rowId || candidate.id}
                      className={`border-t border-charcoal-100 transition-colors ${isBest
                          ? 'bg-amber-50 border-l-4 border-l-amber-400 hover:bg-amber-100/60'
                          : 'hover:bg-cream-200/50'
                        }`}
                    >
                      {/* Name column */}
                      <td className="p-4">
                        <div className="flex items-start gap-2">
                          {isBest && (
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400 mt-0.5 shrink-0" />
                          )}
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-medium text-charcoal-800">{candidate.name}</p>
                              {isBest && (
                                <span className="text-xs font-bold bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full leading-none whitespace-nowrap">
                                  #1 Best Match
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-charcoal-500">{candidate.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="text-charcoal-700">{candidate.role_alignment}</span>
                      </td>

                      <td className="p-4">
                        {getScoreBadge(candidate.skill_score)}
                      </td>

                      <td className="p-4">
                        {getConfidenceBadge(candidate.confidence_band)}
                      </td>

                      <td className="p-4">
                        <span className="text-sm text-charcoal-600">{formatDate(candidate.application_date)}</span>
                      </td>

                      <td className="p-4">
                        {getStatusBadge(candidate.status)}
                      </td>

                      {showActions && (
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const source = (candidate as any).source;
                                navigate(`/candidate/${candidate.id}`, {
                                  state: { candidate, source: source || 'live' },
                                });
                              }}
                              className="gap-1"
                            >
                              <Eye className="h-3 w-3" />
                              View
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => onGeneratePlan?.(candidate)}
                              className="gap-1"
                            >
                              <FileText className="h-3 w-3" />
                              Plan
                            </Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showMore && onShowMore && (
        <div className="flex justify-center pb-4">
          <Button variant="outline" onClick={onShowMore} className="gap-2">
            <span>Show More</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
