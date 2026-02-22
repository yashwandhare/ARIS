import { useState, useMemo, useEffect } from 'react';
import { Filters } from '@/components/Filters';
import { FilterState, Candidate } from '@/types';
import { useNavigate } from 'react-router-dom';
import { getScoreLabel, getConfidenceColor } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { getApplications, updateStatus } from '@/lib/api';
import { mapAppToCandidate } from '@/pages/Dashboard';

export function ReviewRoom() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    score: 'all',
    role: 'all',
    date: 'all',
    status: 'all',
    confidence: 'all',
  });

  async function loadCandidates() {
    try {
      const data = await getApplications();
      const mapped = data.map((app: any) => mapAppToCandidate(app));
      setCandidates(mapped);
    } catch (e) {
      console.error('Failed to load applications', e);
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCandidates();
  }, []);

  const reviewCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      if (candidate.status !== 'in_review' && candidate.status !== 'pending') {
        return false;
      }

      if (filters.search && !candidate.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      if (filters.score !== 'all') {
        const scoreLabel = getScoreLabel(candidate.skill_score);
        if (scoreLabel !== filters.score) return false;
      }

      if (filters.role !== 'all' && candidate.role_alignment !== filters.role) {
        return false;
      }

      if (filters.confidence !== 'all' && candidate.confidence_band !== filters.confidence) {
        return false;
      }

      return true;
    });
  }, [filters, candidates]);

  const handleAccept = async (candidate: Candidate) => {
    setActionLoading(candidate.id);
    try {
      await updateStatus(candidate.id, 'accepted');
      await loadCandidates();
    } catch (e) {
      console.error('Failed to accept', e);
      alert('Failed to accept candidate. ' + (e as Error).message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (candidate: Candidate) => {
    setActionLoading(candidate.id);
    try {
      await updateStatus(candidate.id, 'rejected');
      await loadCandidates();
    } catch (e) {
      console.error('Failed to reject', e);
      alert('Failed to reject candidate. ' + (e as Error).message);
    } finally {
      setActionLoading(null);
    }
  };

  const getConfidenceBadge = (band: string) => {
    const colorClass = getConfidenceColor(band);
    return (
      <Badge className={colorClass}>
        {band}
      </Badge>
    );
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <Badge variant="secondary">{score}</Badge>;
    if (score >= 50) return <Badge variant="default">{score}</Badge>;
    return <Badge variant="destructive">{score}</Badge>;
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-charcoal-800 border-t-transparent mx-auto" />
          <p className="text-charcoal-500">Loading candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 custom-scrollbar overflow-y-auto h-full bg-cream pb-16">
      <div className="space-y-2">
        <h1 className="text-4xl font-serif font-bold text-charcoal-800 uppercase">
          Review Room
        </h1>
        <p className="text-base text-charcoal-500">
          Candidates awaiting your review decision. {reviewCandidates.length} total.
        </p>
      </div>

      <Filters filters={filters} onFilterChange={setFilters} />

      <div className="flat-card overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead className="bg-cream-200">
              <tr>
                <th className="text-left p-4 text-sm font-semibold uppercase text-charcoal-600">Name</th>
                <th className="text-left p-4 text-sm font-semibold uppercase text-charcoal-600">Score</th>
                <th className="text-left p-4 text-sm font-semibold uppercase text-charcoal-600">Role</th>
                <th className="text-left p-4 text-sm font-semibold uppercase text-charcoal-600">Email</th>
                <th className="text-left p-4 text-sm font-semibold uppercase text-charcoal-600">Confidence</th>
                <th className="text-left p-4 text-sm font-semibold uppercase text-charcoal-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviewCandidates.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-charcoal-500">
                    No candidates in review
                  </td>
                </tr>
              ) : (
                reviewCandidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className="border-t border-charcoal-100 hover:bg-cream-200/50 transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-medium text-charcoal-800">{candidate.name}</p>
                    </td>
                    <td className="p-4">
                      {getScoreBadge(candidate.skill_score)}
                    </td>
                    <td className="p-4">
                      <span className="text-charcoal-700">{candidate.role_alignment}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-charcoal-600">{candidate.email}</span>
                    </td>
                    <td className="p-4">
                      {getConfidenceBadge(candidate.confidence_band)}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/candidate/${candidate.id}`, { state: { source: 'live' } })}
                          className="gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => navigate(`/candidate/${candidate.id}`, { state: { generatePlan: true, source: 'live' } })}
                          className="gap-1"
                        >
                          <FileText className="h-3 w-3" />
                          Plan
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleAccept(candidate)}
                          disabled={actionLoading === candidate.id}
                          className="gap-1"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          Accept
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleReject(candidate)}
                          disabled={actionLoading === candidate.id}
                          className="gap-1"
                        >
                          <XCircle className="h-3 w-3" />
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
