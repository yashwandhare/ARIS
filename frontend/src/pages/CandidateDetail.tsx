import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Github,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Save,
  Download,
  Send,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Candidate } from '@/types';
import { getConfidenceColor } from '@/lib/utils';
import { getLanguageColor } from '@/lib/constants';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { getApplicationById, getApplications, generatePlan as apiGeneratePlan, modifyPlan as apiModifyPlan, verifyApplication, getGovernmentVerification } from '@/lib/api';
import { mapAppToCandidate } from '@/pages/Dashboard';

export function CandidateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(true);
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const [trainingPlan, setTrainingPlan] = useState<any>(null);
  const [backgroundReport, setBackgroundReport] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);
  const [auditVisible, setAuditVisible] = useState(false);
  const [showAudit, setShowAudit] = useState(true);
  const [trustScore, setTrustScore] = useState<number | null>(null);
  const [verificationReport, setVerificationReport] = useState<any>(null);
  const [allCandidates, setAllCandidates] = useState<Candidate[]>([]);
  const [chatMessages, setChatMessages] = useState<{ role: 'admin' | 'system'; text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [planOptions, setPlanOptions] = useState({
    weeks: 6,
    dailyHours: 2,
    targetRole: '',
  });

  // Load all candidates for sidebar
  useEffect(() => {
    async function loadAll() {
      try {
        const data = await getApplications();
        setAllCandidates(data.map((app: any) => mapAppToCandidate(app)));
      } catch {
        setAllCandidates([]);
      }
    }
    loadAll();
  }, []);

  const handleGeneratePlanBackend = async (candidateId?: number, opts?: typeof planOptions) => {
    const targetId = candidateId || candidate?.id;
    if (!targetId) return;

    const options = opts ?? planOptions;
    setGeneratingPlan(true);
    setShowProfile(false);

    try {
      const response = await apiGeneratePlan(targetId, {
        weeks: options.weeks,
        daily_hours: options.dailyHours,
        target_role: options.targetRole || undefined,
      });
      const plan = response.training_plan_json
        ? JSON.parse(response.training_plan_json)
        : null;
      setTrainingPlan(plan);
      setChatMessages([]); // reset chat when plan is freshly generated
      // Cache in localStorage
      if (plan) {
        try { localStorage.setItem(`plan_${targetId}`, JSON.stringify(plan)); } catch { }
      }
    } catch (e) {
      console.error('Failed to generate plan', e);
      alert('Failed to generate training plan: ' + (e as Error).message);
      setShowProfile(true);
    } finally {
      setGeneratingPlan(false);
    }
  };

  const handlePlanChat = async () => {
    const msg = chatInput.trim();
    if (!msg || !candidate?.id) return;

    const userMsg = { role: 'admin' as const, text: msg };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await apiModifyPlan(candidate.id, msg);
      const updatedPlan = response.training_plan_json
        ? JSON.parse(response.training_plan_json)
        : null;
      if (updatedPlan) {
        setTrainingPlan(updatedPlan);
        setChatMessages((prev) => [
          ...prev,
          { role: 'system', text: '✓ Plan updated — scroll up to see changes.' },
        ]);
      }
    } catch (e) {
      setChatMessages((prev) => [
        ...prev,
        { role: 'system', text: `⚠ Could not update plan: ${(e as Error).message}` },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!candidate?.id) return;
    setVerifying(true);

    // Cached path: trust score already exists — show 2-second animation
    // then fetch government verification data (DigiLocker + ABC) freshly.
    if (trustScore !== null && verificationReport) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        const govData = await getGovernmentVerification(candidate.id);
        setVerificationReport((prev: any) => ({ ...prev, government_verification: govData }));
      } catch { /* non-fatal */ }
      setAuditVisible(true);
      setVerifying(false);
      return;
    }

    try {
      const response = await verifyApplication(candidate.id);
      setTrustScore(response.trust_score);
      const report = response.verification_report_json
        ? JSON.parse(response.verification_report_json)
        : null;
      // If gov_verification wasn't merged server-side, fetch it now
      if (report && !report.government_verification) {
        try {
          const govData = await getGovernmentVerification(candidate.id);
          report.government_verification = govData;
        } catch { /* non-fatal */ }
      }
      setVerificationReport(report);
      const bgReport = response.background_report_json
        ? JSON.parse(response.background_report_json)
        : null;
      if (bgReport) setBackgroundReport(bgReport);
    } catch (e) {
      console.error('Verification failed', e);
      alert('Failed to run agentic audit: ' + (e as Error).message);
    } finally {
      setAuditVisible(true);
      setVerifying(false);
    }
  };


  // Load specific candidate
  useEffect(() => {
    let isMounted = true;

    async function loadCandidate() {
      if (!id) return;

      // Reset all per-candidate state on every navigation
      setLoading(true);
      setTrainingPlan(null);
      setTrustScore(null);
      setVerificationReport(null);
      setBackgroundReport(null);
      setVerifying(false);
      setAuditVisible(false);
      setShowAudit(true);
      setChatMessages([]);

      try {
        const app: any = await getApplicationById(id);
        const personal = (() => {
          try { return JSON.parse(app.personal_json || '{}'); } catch { return {}; }
        })();
        const githubMetrics = (() => {
          try { return JSON.parse(app.github_metrics_json || '{}'); } catch { return {}; }
        })();
        const resumeAnalysis = (() => {
          try { return JSON.parse(app.resume_analysis_json || '{}'); } catch { return {}; }
        })();
        const scoreBreakdown = (() => {
          try { return JSON.parse(app.score_breakdown_json || '{}'); } catch { return {}; }
        })();
        const learningGaps = (() => {
          try { return JSON.parse(app.learning_gaps_json || '[]'); } catch { return []; }
        })();
        const backgroundReport = (() => {
          try { return JSON.parse(app.background_report_json || '{}'); } catch { return {}; }
        })();

        let confidence = app.confidence_band;
        if (confidence === 'Strong') confidence = 'High Potential';
        if (confidence === 'Good' || confidence === 'Moderate') confidence = 'Medium';
        if (confidence === 'Risk') confidence = 'Risk';

        const mapped: Candidate = {
          id: app.id,
          name: app.full_name,
          email: app.email,
          phone: personal.phone || '',
          location: personal.location || '',
          role_alignment: app.role_applied,
          skill_score: app.master_score ?? 0,
          project_depth: Math.round(scoreBreakdown.project_quality_score ?? 0),
          consistency_score: Math.round(githubMetrics.recent_activity_score_base ?? 0),
          confidence_band: confidence || 'Medium',
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
          linkedin: '',
          resume: '',
          resume_analysis: {
            ats_score: resumeAnalysis.ats_score || 0,
            skill_keywords: resumeAnalysis.keywords_detected || resumeAnalysis.skill_keywords || [],
            project_quality: resumeAnalysis.project_quality || 0,
          },
          role_match_scores: scoreBreakdown.all_role_scores || (
            app.role_applied
              ? { [app.role_applied]: scoreBreakdown.role_alignment_score || 0 }
              : {}
          ),
          analysis: backgroundReport.summary || '',
        };

        if (!isMounted) return;
        setCandidate(mapped);
        setBackgroundReport(backgroundReport);

        // Silently preload audit data from DB so cached path works when user clicks Run Audit
        // (auditVisible stays false — cards don't show until user clicks the button)
        if (app.trust_score) setTrustScore(app.trust_score);
        try {
          if (app.verification_report_json) {
            setVerificationReport(JSON.parse(app.verification_report_json));
          }
        } catch { }

        // Don't auto-show training plan — only restore if explicitly saved
        try {
          const savedPlan = localStorage.getItem(`plan_saved_${app.id}`);
          if (savedPlan) setTrainingPlan(JSON.parse(savedPlan));
        } catch { }

        if (location.state?.generatePlan) {
          handleGeneratePlanBackend(app.id);
        }
      } catch (err) {
        if (!isMounted) return;
        setCandidate(null);
        setLoadError((err as Error).message || 'Failed to load candidate.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCandidate();
    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Clear error on id change
  useEffect(() => { setLoadError(null); }, [id]);

  const formatPlanAsText = (plan: any): string => {
    if (!plan) return '';
    let text = '# Training Plan\n\n';
    text += `Summary: ${plan.summary || 'N/A'}\n\n`;
    if (plan.focus_areas?.length) {
      text += 'Focus Areas:\n';
      plan.focus_areas.forEach((area: string) => { text += `- ${area}\n`; });
      text += '\n';
    }
    if (plan.weekly_plan?.length) {
      text += '## Weekly Plan\n\n';
      plan.weekly_plan.forEach((week: any) => {
        text += `### Week ${week.week}: ${week.goal}\n`;
        if (week.deliverables?.length) {
          text += 'Deliverables:\n';
          week.deliverables.forEach((d: string) => { text += `- ${d}\n`; });
        }
        text += '\n';
      });
    }
    return text;
  };

  const handleSavePlan = () => {
    if (!candidate?.id || !trainingPlan) return;
    try {
      localStorage.setItem(`plan_saved_${candidate.id}`, JSON.stringify(trainingPlan));
      alert('Training plan saved! It will be remembered when you return to this profile.');
    } catch {
      alert('Could not save plan to local storage.');
    }
  };

  const handleDownloadPlan = () => {
    if (!candidate || !trainingPlan) return;
    const text = formatPlanAsText(trainingPlan);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `training-plan-${candidate.name.replace(/\s+/g, '-')}.txt`;
    a.click();
  };

  if (loading) {
    return (
      <div className="p-8">
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="mt-8 text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-charcoal-800 border-t-transparent mx-auto" />
          <p className="text-charcoal-500">Loading candidate...</p>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="p-8 space-y-4">
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="mt-8 text-center space-y-3">
          <h2 className="text-2xl font-serif font-semibold text-charcoal-800">
            {loadError ? 'Failed to load candidate' : 'Candidate not found'}
          </h2>
          {loadError && (
            <p className="text-sm text-charcoal-500 max-w-md mx-auto">{loadError}</p>
          )}
          <div className="flex gap-3 justify-center mt-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              Dashboard
            </Button>
            {loadError && (
              <Button onClick={() => { setLoadError(null); setLoading(true); window.location.reload(); }}>
                Retry
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Filter: drop languages under 3% — they cause cluttered labels
  const MIN_PCT = 3;
  const significant = Object.entries(candidate.github.languages)
    .map(([name, value]) => ({ name, value: value as number }))
    .filter(e => e.value >= MIN_PCT)
    .sort((a, b) => b.value - a.value);

  const tinySum = Object.entries(candidate.github.languages)
    .filter(([, v]) => (v as number) < MIN_PCT)
    .reduce((s, [, v]) => s + (v as number), 0);

  const MAX_SLICES = 6;
  let languageData: { name: string; value: number; color: string }[];
  const base = significant.length <= MAX_SLICES ? significant : significant.slice(0, MAX_SLICES);
  const overflowSum = significant.length > MAX_SLICES
    ? significant.slice(MAX_SLICES).reduce((s, e) => s + e.value, 0)
    : 0;
  const otherTotal = Math.round((tinySum + overflowSum) * 10) / 10;

  languageData = base.map((e, i) => ({ ...e, color: getLanguageColor(i) }));
  if (otherTotal >= MIN_PCT) {
    languageData = [...languageData, { name: 'Other', value: otherTotal, color: '#BBBBBB' }];
  }

  const roleMatchData = Object.entries(candidate.role_match_scores).map(([role, score]) => ({
    role: role.replace(' Developer', '').replace(' Engineer', ''),
    score,
  }));

  return (
    <div className="flex h-full bg-cream">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="header-blur border-b border-charcoal-200 p-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="text-sm text-charcoal-500 font-medium">
              Dashboard / Candidates / {candidate.name}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 pb-16">
          <Card className="flat-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-6">
                  <div className="w-20 h-20 bg-charcoal-800 rounded-xl flex items-center justify-center">
                    <span className="text-cream font-bold text-3xl font-serif">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-3xl font-serif font-bold text-charcoal-800">{candidate.name}</h1>
                    <div className="flex items-center gap-3">
                      <Badge className={getConfidenceColor(candidate.confidence_band)}>
                        Score: {candidate.skill_score}
                      </Badge>
                      <Badge variant="outline">
                        {candidate.role_alignment}
                      </Badge>
                      <Badge variant={candidate.status === 'accepted' ? 'secondary' : candidate.status === 'rejected' ? 'destructive' : 'outline'}>
                        {candidate.status.replace('_', ' ')}
                      </Badge>
                      {trustScore !== null && (
                        <Badge className={`${trustScore >= 70 ? 'bg-lime/20 text-charcoal-800 border-lime/30' : trustScore >= 45 ? 'bg-orange/20 text-charcoal-800 border-orange/30' : 'bg-red-100 text-red-800 border-red-200'}`}>
                          Trust: {trustScore}/100
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleVerify}
                    disabled={verifying}
                    className="gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-cream"
                  >
                    {verifying ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-cream border-t-transparent" />
                        Agents Auditing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Run Agentic Audit
                      </>
                    )}
                  </Button>

                  {trainingPlan && (
                    <Button
                      variant="outline"
                      onClick={() => setShowProfile(!showProfile)}
                      className="gap-2"
                    >
                      {showProfile ? 'Hide Profile' : 'Show Profile'}
                      {showProfile ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {verifying && (
            <Card className="flat-card border-orange/30 bg-orange/5">
              <CardContent className="p-8 text-center space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 bg-orange/20 rounded-full animate-ping"></div>
                    <div className="absolute inset-2 bg-orange rounded-full flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white animate-pulse" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-serif font-bold text-charcoal-800">CrewAI Agents Running</h3>
                <div className="space-y-2 max-w-md mx-auto text-sm text-charcoal-600">
                  <p className="animate-pulse">🔍 GitHub Analyst verifying commit history and code quality...</p>
                  <p className="animate-pulse" style={{ animationDelay: '0.5s' }}>⚖️ Fraud Detector cross-referencing resume claims with code evidence...</p>
                  <p className="animate-pulse" style={{ animationDelay: '1s' }}>📑 Compliance Manager calculating final Truth & Trust Score...</p>
                  <p className="animate-pulse" style={{ animationDelay: '1.5s' }}>🎓 Onboarding Planner generating personalized curriculum...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {!verifying && auditVisible && verificationReport && (
            <Card className={`flat-card border-2 ${trustScore !== null && trustScore >= 70 ? 'border-lime/30' : trustScore !== null && trustScore >= 45 ? 'border-orange/30' : 'border-red-200'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className={`h-5 w-5 ${trustScore !== null && trustScore >= 70 ? 'text-lime-600' : trustScore !== null && trustScore >= 45 ? 'text-orange' : 'text-red-500'}`} />
                    Agentic Verification Report
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs text-charcoal-500">Generated by AI Agents</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAudit(!showAudit)}
                      className="h-7 w-7 p-0 rounded-full"
                      title={showAudit ? 'Collapse audit' : 'Expand audit'}
                    >
                      {showAudit ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {showAudit && (
                <CardContent className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-xl border flex flex-col items-center justify-center text-center ${trustScore !== null && trustScore >= 70 ? 'bg-lime/10 border-lime/20' : trustScore !== null && trustScore >= 45 ? 'bg-orange/10 border-orange/20' : 'bg-red-50 border-red-100'}`}>
                      <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">True Trust Score</p>
                      <div className="text-6xl font-serif font-bold">{trustScore}</div>
                      <p className="text-sm mt-3 opacity-90 font-medium">
                        Risk Level: <span className="uppercase">{verificationReport.risk_level?.replace('_', ' ') || 'UNKNOWN'}</span>
                      </p>
                    </div>

                    <div className="p-6 bg-cream-200 rounded-xl border border-charcoal-100 flex flex-col justify-center">
                      <p className="text-sm font-semibold text-charcoal-700 mb-2">Compliance Summary</p>
                      <p className="text-sm text-charcoal-600 leading-relaxed">
                        {verificationReport.verification_summary || 'No summary provided.'}
                      </p>
                      {verificationReport.recommendation && (
                        <div className="mt-4 pt-4 border-t border-charcoal-200/50 flex justify-between items-center text-sm">
                          <span className="font-semibold text-charcoal-700">Recommendation:</span>
                          <Badge className="uppercase tracking-wide">{verificationReport.recommendation.replace('_', ' ')}</Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {verificationReport.red_flags?.length > 0 && (
                    <div>
                      <p className="text-sm font-bold text-red-600 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        Crucial Red Flags Discovered
                      </p>
                      <div className="space-y-2">
                        {verificationReport.red_flags.map((flag: string, i: number) => (
                          <div key={i} className="p-3 bg-red-50 text-red-800 text-sm rounded-lg border border-red-100">
                            {flag}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {verificationReport.key_findings?.length > 0 && (
                    <div>
                      <p className="text-sm font-bold text-charcoal-700 mb-3">Key Evidence Findings</p>
                      <ul className="space-y-2">
                        {verificationReport.key_findings.map((finding: string, i: number) => (
                          <li key={i} className="text-sm text-charcoal-600 flex items-start gap-2 bg-cream/50 p-2 rounded">
                            <span className="text-sky mt-1">▸</span>{finding}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </CardContent>
              )}
            </Card>
          )}

          {/* ── DigiLocker + ABC Government Verification ─────────────────── */}
          {!verifying && auditVisible && showAudit && verificationReport?.government_verification && (() => {
            const gov = verificationReport.government_verification;
            const dl = gov.digilocker;
            const abc = gov.abc;
            const docIcon: Record<string, string> = {
              AADHAR: '🪪', PAN: '💳', DEGREE: '🎓', MARKSHEET_12: '📋', MARKSHEET_10: '📋',
            };
            const statusColor = (s: string) =>
              s === 'verified' ? 'bg-lime/20 text-green-800 border-lime/40'
                : s === 'pending' ? 'bg-orange/20 text-orange-800 border-orange/40'
                  : 'bg-red-50 text-red-800 border-red-200';
            return (
              <>
                <Card className="flat-card border-2 border-sky/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <span className="text-xl">🏛️</span>
                        DigiLocker Verification
                        <Badge className={`ml-2 text-xs ${dl.status === 'fully_verified' ? 'bg-lime/20 text-green-800 border-lime/40' : 'bg-orange/20 text-orange-800'}`}>
                          {dl.status === 'fully_verified' ? '✓ Fully Verified' : '⚡ Partially Verified'}
                        </Badge>
                      </CardTitle>
                      <Badge variant="outline" className="text-xs text-charcoal-400 font-mono">MOCK · Integration Ready</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-2">
                      <div className="p-3 rounded-lg bg-cream-200 border border-charcoal-100">
                        <p className="text-xs text-charcoal-500 font-medium">Aadhaar Linked</p>
                        <p className="font-semibold text-charcoal-800 mt-1">{dl.aadhaar_linked ? '✓ Yes' : '✗ No'}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-cream-200 border border-charcoal-100">
                        <p className="text-xs text-charcoal-500 font-medium">Docs Verified</p>
                        <p className="font-semibold text-charcoal-800 mt-1">{dl.verified_documents}/{dl.total_documents}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-cream-200 border border-charcoal-100">
                        <p className="text-xs text-charcoal-500 font-medium">Overall Status</p>
                        <p className={`font-semibold mt-1 capitalize ${dl.status === 'fully_verified' ? 'text-green-700' : 'text-orange-600'}`}>
                          {dl.status.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {dl.documents?.map((doc: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-charcoal-100 bg-white/60">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{docIcon[doc.doc_type] || '📄'}</span>
                            <div>
                              <p className="font-medium text-charcoal-800 text-sm">{doc.name}</p>
                              <p className="text-xs text-charcoal-500">
                                {doc.issuer}{doc.year ? ` · ${doc.year}` : ''}{doc.cgpa ? ` · CGPA ${doc.cgpa}` : ''}{doc.percentage ? ` · ${doc.percentage}%` : ''}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full border font-medium ${statusColor(doc.status)}`}>
                              {doc.status === 'verified' ? '✓ Verified' : '⏳ Pending'}
                            </span>
                            {doc.verified_at && <span className="text-xs text-charcoal-400 font-mono hidden md:block">{doc.verified_at}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-charcoal-400 italic pt-1">🔗 Production: {dl.api_endpoint} · {dl.note}</p>
                  </CardContent>
                </Card>

                <Card className="flat-card border-2 border-lime/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <span className="text-xl">🎓</span>
                        Academic Bank of Credits (ABC)
                        <Badge className="ml-2 text-xs bg-lime/20 text-green-800 border-lime/40">✓ Verified</Badge>
                      </CardTitle>
                      <Badge variant="outline" className="text-xs text-charcoal-400 font-mono">MOCK · Integration Ready</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="p-3 rounded-lg bg-cream-200 border border-charcoal-100">
                        <p className="text-xs text-charcoal-500 font-medium">ABC ID</p>
                        <p className="font-mono font-semibold text-charcoal-800 mt-1 text-xs">{abc.abc_id}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-cream-200 border border-charcoal-100">
                        <p className="text-xs text-charcoal-500 font-medium">Credits Earned</p>
                        <p className="font-bold text-charcoal-800 mt-1">{abc.total_credits_earned} / {abc.credits_required}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-cream-200 border border-charcoal-100">
                        <p className="text-xs text-charcoal-500 font-medium">SGPA</p>
                        <p className="font-bold text-charcoal-800 mt-1">{abc.sgpa} / 10</p>
                      </div>
                      <div className="p-3 rounded-lg bg-cream-200 border border-charcoal-100">
                        <p className="text-xs text-charcoal-500 font-medium">Completion</p>
                        <p className={`font-bold mt-1 ${abc.completion_percentage >= 80 ? 'text-green-700' : 'text-orange-600'}`}>{abc.completion_percentage}%</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal-700 mb-2">Credited Courses</p>
                      <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                        {abc.courses?.map((c: any, i: number) => (
                          <div key={i} className="flex items-center justify-between text-xs p-2 rounded border border-charcoal-100 bg-white/60 hover:bg-cream-100 transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-charcoal-400 w-14 shrink-0">{c.course_code}</span>
                              <span className="text-charcoal-700">{c.course_name}</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-charcoal-400 hidden md:block">{c.semester}</span>
                              <span className={`font-bold w-6 text-center ${c.grade === 'A+' ? 'text-green-700' : c.grade === 'A' ? 'text-green-600' : c.grade === 'B+' ? 'text-sky-600' : 'text-charcoal-600'}`}>{c.grade}</span>
                              <span className="text-charcoal-400 w-12 text-right">{c.credits} cr</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-charcoal-400 italic">🔗 Production: {abc.api_endpoint} · {abc.note}</p>
                  </CardContent>
                </Card>
              </>
            );
          })()}

          {showProfile && (
            <>
              <Card className="flat-card">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-sky/20">
                        <Mail className="h-4 w-4 text-charcoal-700" />
                      </div>
                      <div>
                        <p className="text-xs text-charcoal-500 font-medium">Email</p>
                        <a href={`mailto:${candidate.email}`} className="font-medium text-charcoal-800 hover:text-sky">
                          {candidate.email}
                        </a>
                      </div>
                    </div>

                    {candidate.phone && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-lime/20">
                          <Phone className="h-4 w-4 text-charcoal-700" />
                        </div>
                        <div>
                          <p className="text-xs text-charcoal-500 font-medium">Phone</p>
                          <p className="font-medium text-charcoal-800">{candidate.phone}</p>
                        </div>
                      </div>
                    )}

                    {candidate.location && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-orange/20">
                          <MapPin className="h-4 w-4 text-charcoal-700" />
                        </div>
                        <div>
                          <p className="text-xs text-charcoal-500 font-medium">Location</p>
                          <p className="font-medium text-charcoal-800">{candidate.location}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-sky/20">
                        <Github className="h-4 w-4 text-charcoal-700" />
                      </div>
                      <div>
                        <p className="text-xs text-charcoal-500 font-medium">GitHub</p>
                        <a
                          href={candidate.github.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-charcoal-800 hover:text-sky"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="flat-card-hover">
                  <CardHeader>
                    <CardTitle className="text-base">Skill Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-serif font-bold text-charcoal-800">{candidate.skill_score}</div>
                    <p className="text-sm text-charcoal-500 mt-2">Out of 100</p>
                  </CardContent>
                </Card>

                <Card className="flat-card-hover">
                  <CardHeader>
                    <CardTitle className="text-base">Project Quality</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-serif font-bold text-charcoal-800">{candidate.project_depth}</div>
                    <p className="text-sm text-charcoal-500 mt-2">Quality rating</p>
                  </CardContent>
                </Card>

                <Card className="flat-card-hover">
                  <CardHeader>
                    <CardTitle className="text-base">Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-serif font-bold text-charcoal-800">{candidate.consistency_score}</div>
                    <p className="text-sm text-charcoal-500 mt-2">Recent activity score</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="flat-card">
                <CardHeader>
                  <CardTitle>GitHub Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-cream-200 border border-charcoal-100">
                      <p className="text-sm text-charcoal-500 font-medium">Repositories</p>
                      <p className="text-2xl font-bold text-charcoal-800">{candidate.github.repos}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-cream-200 border border-charcoal-100">
                      <p className="text-sm text-charcoal-500 font-medium">Total Stars</p>
                      <p className="text-2xl font-bold text-charcoal-800">{candidate.github.stars}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-cream-200 border border-charcoal-100">
                      <p className="text-sm text-charcoal-500 font-medium">Commits (90d)</p>
                      <p className="text-2xl font-bold text-charcoal-800">{candidate.github.commits_90_days}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-cream-200 border border-charcoal-100">
                      <p className="text-sm text-charcoal-500 font-medium">Last Active</p>
                      <p className="text-sm font-medium text-charcoal-800">
                        {candidate.github.last_activity
                          ? new Date(candidate.github.last_activity).toLocaleDateString()
                          : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {languageData.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-3 text-charcoal-700">Programming Languages</p>
                      <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                          <Pie
                            data={languageData}
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
                            dataKey="value"
                            labelLine={true}
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {languageData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value: number, name: string) => [`${value}%`, name]}
                            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e5e5', fontSize: '12px' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>

              {roleMatchData.length > 0 && (
                <Card className="flat-card">
                  <CardHeader>
                    <CardTitle>Role Match Scores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={roleMatchData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" vertical={false} />
                        <XAxis
                          dataKey="role"
                          stroke="#3D3D3D"
                          style={{ fontSize: '12px', fontWeight: '500' }}
                          tick={{ fill: '#3D3D3D' }}
                        />
                        <YAxis
                          stroke="#3D3D3D"
                          style={{ fontSize: '11px' }}
                          tickFormatter={(v) => `${v}%`}
                          domain={[0, (max: number) => Math.min(100, Math.ceil(max * 1.25 / 10) * 10)]}
                          width={42}
                        />
                        <Tooltip formatter={(value: number) => [`${value}%`, 'Match Score']} />
                        <Bar dataKey="score" radius={[4, 4, 0, 0]} fill="#8ACBE1" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              <Card className="flat-card">
                <CardHeader>
                  <CardTitle>Profile Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-cream-200 rounded-lg border border-charcoal-100 text-sm leading-relaxed text-charcoal-700">
                    {candidate.analysis || 'No analysis generated yet.'}
                  </div>

                  {backgroundReport?.strengths?.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2 text-charcoal-700">Strengths</p>
                      <div className="flex flex-wrap gap-2">
                        {backgroundReport.strengths.map((s: string, i: number) => (
                          <Badge key={i} className="bg-lime/20 text-charcoal-700 border-lime/30 text-xs">{s}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {backgroundReport?.weaknesses?.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2 text-charcoal-700">Weaknesses</p>
                      <div className="flex flex-wrap gap-2">
                        {backgroundReport.weaknesses.map((w: string, i: number) => (
                          <Badge key={i} className="bg-orange/20 text-charcoal-700 border-orange/30 text-xs">{w}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {backgroundReport?.risks?.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2 text-charcoal-700">Risks</p>
                      <div className="flex flex-wrap gap-2">
                        {backgroundReport.risks.map((r: string, i: number) => (
                          <Badge key={i} variant="destructive" className="text-xs">{r}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {backgroundReport?.growth_direction && (
                    <div>
                      <p className="text-sm font-medium mb-1 text-charcoal-700">Growth Direction</p>
                      <p className="text-sm text-charcoal-600">{backgroundReport.growth_direction}</p>
                    </div>
                  )}

                  {candidate.learning_gap.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2 text-charcoal-700">Learning Gaps</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.learning_gap.map((gap, i) => (
                          <Badge key={i} variant="destructive">{gap}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {(candidate.resume_analysis.ats_score > 0 || candidate.resume_analysis.skill_keywords.length > 0) && (
                <Card className="flat-card">
                  <CardHeader>
                    <CardTitle>Resume Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-cream-200 border border-charcoal-100">
                        <p className="text-sm text-charcoal-500 font-medium">ATS Score</p>
                        <p className="text-2xl font-bold text-charcoal-800">{candidate.resume_analysis.ats_score}<span className="text-sm font-normal text-charcoal-500">/100</span></p>
                      </div>
                      <div className="p-4 rounded-lg bg-cream-200 border border-charcoal-100">
                        <p className="text-sm text-charcoal-500 font-medium">Project Quality</p>
                        <p className="text-2xl font-bold text-charcoal-800">{candidate.resume_analysis.project_quality}<span className="text-sm font-normal text-charcoal-500">/100</span></p>
                      </div>
                    </div>
                    {candidate.resume_analysis.skill_keywords.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2 text-charcoal-700">Detected Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {candidate.resume_analysis.skill_keywords.map((kw, i) => (
                            <Badge key={i} variant="outline" className="text-xs capitalize">{kw}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {!trainingPlan && (
            <Card className="flat-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-orange" />
                  Generate Training Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm text-charcoal-500">
                  Configure the parameters below to generate a tailored training plan based on the candidate's core evaluation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-cream-200/50 p-4 rounded-xl border border-charcoal-100">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-charcoal-700">Duration (Weeks)</label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={planOptions.weeks}
                      onChange={(e) => setPlanOptions({ ...planOptions, weeks: parseInt(e.target.value) || 6 })}
                      className="w-full text-sm px-3 py-2 rounded-lg border border-charcoal-200 bg-cream focus:outline-none focus:ring-2 focus:ring-charcoal-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-charcoal-700">Daily Hours</label>
                    <input
                      type="number"
                      min={1}
                      max={8}
                      value={planOptions.dailyHours}
                      onChange={(e) => setPlanOptions({ ...planOptions, dailyHours: parseFloat(e.target.value) || 2 })}
                      className="w-full text-sm px-3 py-2 rounded-lg border border-charcoal-200 bg-cream focus:outline-none focus:ring-2 focus:ring-charcoal-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-charcoal-700">Target Role (Optional)</label>
                    <input
                      type="text"
                      placeholder={candidate.role_alignment || 'e.g. Frontend Developer'}
                      value={planOptions.targetRole}
                      onChange={(e) => setPlanOptions({ ...planOptions, targetRole: e.target.value })}
                      className="w-full text-sm px-3 py-2 rounded-lg border border-charcoal-200 bg-cream focus:outline-none focus:ring-2 focus:ring-charcoal-400 placeholder:text-charcoal-400"
                    />
                  </div>
                </div>

                <Button
                  onClick={() => handleGeneratePlanBackend()}
                  disabled={generatingPlan}
                  className="w-full gap-2"
                  size="lg"
                >
                  {generatingPlan ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Generating Plan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Plan
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {trainingPlan && (
            <Card className="flat-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-orange" />
                    Training Plan Generated
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleSavePlan} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="default" onClick={handleDownloadPlan} className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-cream-200 rounded-lg border border-charcoal-100 space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-charcoal-700">Summary</p>
                    <p className="text-sm text-charcoal-600 mt-1">{trainingPlan.summary}</p>
                  </div>

                  {trainingPlan.focus_areas?.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-charcoal-700">Focus Areas</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {trainingPlan.focus_areas.map((area: string, i: number) => (
                          <Badge key={i} variant="outline">{area}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {trainingPlan.weekly_plan?.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-charcoal-700">Weekly Plan</p>
                      {trainingPlan.weekly_plan.map((week: any, i: number) => (
                        <div key={i} className="p-4 bg-cream rounded-lg border border-charcoal-100 space-y-2">
                          <p className="text-sm font-semibold text-charcoal-800">
                            Week {week.week}: {week.goal}
                          </p>

                          {week.objectives?.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-charcoal-600">Objectives</p>
                              <ul className="mt-1 space-y-0.5">
                                {week.objectives.map((o: string, j: number) => (
                                  <li key={j} className="text-xs text-charcoal-600 flex items-start gap-2">
                                    <span className="text-sky mt-0.5">▸</span>{o}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {week.topics?.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-charcoal-600">Topics</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {week.topics.map((t: string, j: number) => (
                                  <span key={j} className="text-xs bg-sky/10 text-charcoal-700 px-2 py-0.5 rounded-full">{t}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          {week.tasks?.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-charcoal-600">Tasks</p>
                              <ul className="mt-1 space-y-0.5">
                                {week.tasks.map((t: string, j: number) => (
                                  <li key={j} className="text-xs text-charcoal-600 flex items-start gap-2">
                                    <span className="text-orange mt-0.5">◆</span>{t}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {week.deliverables?.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-charcoal-600">Deliverables</p>
                              <ul className="mt-1 space-y-0.5">
                                {week.deliverables.map((d: string, j: number) => (
                                  <li key={j} className="text-xs text-charcoal-600 flex items-start gap-2">
                                    <span className="text-lime-600 mt-0.5">✓</span>{d}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTrainingPlan(null);
                      setShowProfile(true);
                      setChatMessages([]);
                    }}
                    className="flex-1"
                  >
                    Regenerate
                  </Button>
                </div>

                {/* ── Plan modification chat ── */}
                <div className="mt-6 border-t border-charcoal-200 pt-5 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-charcoal-700">
                    <MessageSquare className="h-4 w-4 text-orange" />
                    Modify Plan via Chat
                  </div>

                  {/* message thread */}
                  {chatMessages.length > 0 && (
                    <div className="space-y-2 max-h-52 overflow-y-auto custom-scrollbar pr-1">
                      {chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${msg.role === 'admin' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${msg.role === 'admin'
                              ? 'bg-charcoal-800 text-cream rounded-br-none'
                              : 'bg-cream-200 text-charcoal-700 border border-charcoal-100 rounded-bl-none'
                              }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {chatLoading && (
                        <div className="flex justify-start">
                          <div className="bg-cream-200 border border-charcoal-100 rounded-xl rounded-bl-none px-3 py-2.5">
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-charcoal-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-1.5 h-1.5 rounded-full bg-charcoal-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-1.5 h-1.5 rounded-full bg-charcoal-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* input row */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey && chatInput.trim()) {
                          e.preventDefault();
                          handlePlanChat();
                        }
                      }}
                      disabled={chatLoading}
                      placeholder='e.g. "Add a week on system design" or "Make it beginner-friendly"'
                      className="flex-1 text-sm px-3 py-2 rounded-lg border border-charcoal-200 bg-cream focus:outline-none focus:ring-2 focus:ring-charcoal-400 placeholder:text-charcoal-400 disabled:opacity-50"
                    />
                    <Button
                      size="sm"
                      onClick={handlePlanChat}
                      disabled={chatLoading || !chatInput.trim()}
                      className="gap-1.5 shrink-0"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Send
                    </Button>
                  </div>
                  <p className="text-xs text-charcoal-400">
                    Describe changes in plain English — the AI will update the plan accordingly.
                  </p>
                </div>
              </CardContent>
            </Card>

          )}
        </div>
      </div>

      <div className="w-72 border-l border-charcoal-200 sidebar-blur flex flex-col">
        <div className="p-4 border-b border-charcoal-200">
          <h3 className="font-serif font-semibold text-charcoal-800">All Candidates</h3>
          <p className="text-xs text-charcoal-500 mt-1">{allCandidates.length} total</p>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {allCandidates.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate(`/candidate/${c.id}`, { state: { source: 'live' } })}
              className={`w-full p-3 text-left border-b border-charcoal-100 transition-colors ${c.id === candidate.id
                ? 'bg-cream-200'
                : 'hover:bg-cream-200/50'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-charcoal-800 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-cream font-bold text-xs">
                    {c.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-charcoal-800 truncate text-sm">{c.name}</p>
                  <p className="text-xs text-charcoal-500 truncate">{c.role_alignment}</p>
                </div>
                <Badge
                  variant={c.skill_score >= 80 ? 'secondary' : c.skill_score >= 50 ? 'default' : 'destructive'}
                  className="shrink-0 text-xs"
                >
                  {c.skill_score}
                </Badge>
              </div>
            </button>
          ))}
          {allCandidates.length === 0 && (
            <div className="p-4 text-center text-sm text-charcoal-500">
              No candidates yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
