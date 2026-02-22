import { useState, useMemo, useEffect } from 'react';
import { StatsCards } from '@/components/StatsCards';
import { Filters } from '@/components/Filters';
import { CandidateTable } from '@/components/CandidateTable';
import { FilterState, Candidate, DashboardStats } from '@/types';
import { useNavigate } from 'react-router-dom';
import { getScoreLabel } from '@/lib/utils';
import { getApplications, getApplicationStats } from '@/lib/api';

function mapAppToCandidate(app: any): Candidate {
  let confidence = app.confidence_band;
  if (confidence === 'Strong') confidence = 'High Potential';
  if (confidence === 'Good' || confidence === 'Moderate') confidence = 'Medium';
  if (!confidence) confidence = 'Medium';

  let githubMetrics: any = {};
  try { githubMetrics = JSON.parse(app.github_metrics_json || '{}'); } catch { }

  let learningGaps: string[] = [];
  try { learningGaps = JSON.parse(app.learning_gaps_json || '[]'); } catch { }

  let scoreBreakdown: any = {};
  try { scoreBreakdown = JSON.parse(app.score_breakdown_json || '{}'); } catch { }

  let backgroundReport: any = {};
  try { backgroundReport = JSON.parse(app.background_report_json || '{}'); } catch { }

  let resumeAnalysis: any = {};
  try { resumeAnalysis = JSON.parse(app.resume_analysis_json || '{}'); } catch { }

  return {
    id: app.id,
    name: app.full_name,
    email: app.email,
    phone: '',
    location: '',
    role_alignment: app.role_applied,
    skill_score: app.master_score ?? 0,
    project_depth: Math.round(scoreBreakdown.project_quality_score ?? 0),
    consistency_score: Math.round(githubMetrics.recent_activity_score_base ?? 0),
    confidence_band: confidence,
    learning_gap: learningGaps,
    status: app.status,
    application_date: app.created_at,
    github: {
      url: app.github_url,
      repos: githubMetrics.total_public_repos || githubMetrics.total_repos || 0,
      stars: githubMetrics.total_stars || 0,
      languages: githubMetrics.languages || {},
      commits_90_days: githubMetrics.commits_last_90_days || 0,
      last_activity: githubMetrics.last_activity || '',
    },
    resume_analysis: {
      ats_score: resumeAnalysis?.ats_score || 0,
      skill_keywords: resumeAnalysis?.keywords_detected || resumeAnalysis?.skill_keywords || [],
      project_quality: resumeAnalysis?.project_quality || 0,
    },
    role_match_scores: scoreBreakdown.all_role_scores || (
      app.role_applied
        ? { [app.role_applied]: scoreBreakdown.role_alignment_score || 0 }
        : {}
    ),
    analysis: backgroundReport.summary || '',
  };
}

export { mapAppToCandidate };

export function Dashboard() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total_applications: 0,
    new_this_week: 0,
    pending_review: 0,
    accepted: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    score: 'all',
    role: 'all',
    date: 'all',
    status: 'all',
    confidence: 'all',
  });
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [data, statsData] = await Promise.all([
          getApplications(),
          getApplicationStats(),
        ]);
        const mapped = data.map((app: any) => ({
          ...mapAppToCandidate(app),
          rowId: `live-${app.id}`,
          source: 'live',
        }));
        setCandidates(mapped as Candidate[]);
        setStats(statsData);
      } catch (e) {
        console.error('Failed to load applications', e);
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredCandidates = useMemo(() => {
    const anyFilterActive =
      filters.search !== '' ||
      filters.score !== 'all' ||
      filters.role !== 'all' ||
      filters.status !== 'all' ||
      filters.confidence !== 'all' ||
      filters.date !== 'all';

    const result = candidates.filter((candidate) => {
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

      if (filters.status !== 'all' && candidate.status !== filters.status) {
        return false;
      }

      if (filters.confidence !== 'all' && candidate.confidence_band !== filters.confidence) {
        return false;
      }

      if (filters.date !== 'all') {
        const candidateDate = new Date(candidate.application_date);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - candidateDate.getTime()) / (1000 * 60 * 60 * 24));

        if (filters.date === 'today' && daysDiff > 0) return false;
        if (filters.date === 'week' && daysDiff > 7) return false;
        if (filters.date === 'month' && daysDiff > 30) return false;
      }

      return true;
    });

    // Sort by score descending whenever any filter is active
    if (anyFilterActive) {
      result.sort((a, b) => b.skill_score - a.skill_score);
    }

    return result;
  }, [filters, candidates]);

  // Best candidate: only when role filter is active, ranked by that role's specific match score
  const bestCandidateId = useMemo(() => {
    if (filters.role === 'all' || filteredCandidates.length === 0) return null;

    // Normalize role key to match all_role_scores keys (lowercase, no "Developer"/"Engineer")
    const roleKey = filters.role
      .toLowerCase()
      .replace(' developer', '')
      .replace(' engineer', '')
      .trim();

    let bestId: number | null = null;
    let bestScore = -1;

    for (const c of filteredCandidates) {
      // Try exact role key match first, then full role name
      const scores = c.role_match_scores as Record<string, number>;
      const matchScore =
        scores[roleKey] ??
        scores[filters.role.toLowerCase()] ??
        scores[Object.keys(scores).find(k => k.includes(roleKey) || roleKey.includes(k)) ?? ''] ??
        c.skill_score;

      if (matchScore > bestScore) {
        bestScore = matchScore;
        bestId = c.id;
      }
    }

    return bestId;
  }, [filters.role, filteredCandidates]);

  const displayedCandidates = showAll ? filteredCandidates : filteredCandidates.slice(0, 10);

  const handleGeneratePlan = (candidate: Candidate) => {
    navigate(`/candidate/${candidate.id}`, { state: { generatePlan: true, source: 'live' } });
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-charcoal-800 border-t-transparent mx-auto" />
          <p className="text-charcoal-500">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 custom-scrollbar overflow-y-auto h-full bg-cream pb-16">
      <div className="space-y-2">
        <h1 className="text-4xl font-serif font-bold text-charcoal-800">
          Welcome back, Admin
        </h1>
        <p className="text-base text-charcoal-500">
          Here's what's happening with your intern applications today.
        </p>
      </div>

      <StatsCards stats={stats} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-semibold text-charcoal-800">Applications</h2>
          <div className="text-sm text-charcoal-500">
            Showing {displayedCandidates.length} of {filteredCandidates.length} candidates
          </div>
        </div>

        <Filters filters={filters} onFilterChange={setFilters} />

        <CandidateTable
          candidates={displayedCandidates}
          showMore={!showAll && filteredCandidates.length > 10}
          onShowMore={() => setShowAll(true)}
          onGeneratePlan={handleGeneratePlan}
          bestCandidateId={bestCandidateId}
        />
      </div>
    </div>
  );
}
