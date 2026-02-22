import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getApplications } from '@/lib/api';
import { mapAppToCandidate } from '@/pages/Dashboard';
import { Candidate } from '@/types';

export function Analytics() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getApplications();
        setCandidates(data.map((app: any) => mapAppToCandidate(app)));
      } catch (e) {
        console.error('Failed to load data', e);
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Derive role distribution from real data
  const roleCounts: Record<string, number> = {};
  candidates.forEach((c) => {
    const role = c.role_alignment || 'Other';
    roleCounts[role] = (roleCounts[role] || 0) + 1;
  });
  const roleDistributionData = Object.entries(roleCounts).map(([role, count]) => ({
    role: role.replace(' Developer', '').replace(' Engineer', ''),
    count,
  }));

  // Derive status counts
  const statusCounts = { accepted: 0, rejected: 0, pending: 0, in_review: 0 };
  candidates.forEach((c) => {
    if (c.status in statusCounts) {
      statusCounts[c.status as keyof typeof statusCounts]++;
    }
  });

  const total = candidates.length;
  const acceptanceRate = total > 0 ? Math.round((statusCounts.accepted / total) * 100) : 0;

  // Score distribution
  const scoreRanges = [
    { range: '0-30', count: candidates.filter((c) => c.skill_score < 30).length },
    { range: '30-50', count: candidates.filter((c) => c.skill_score >= 30 && c.skill_score < 50).length },
    { range: '50-65', count: candidates.filter((c) => c.skill_score >= 50 && c.skill_score < 65).length },
    { range: '65-80', count: candidates.filter((c) => c.skill_score >= 65 && c.skill_score < 80).length },
    { range: '80-100', count: candidates.filter((c) => c.skill_score >= 80).length },
  ];

  // Confidence band distribution (Application Quality)
  const confidenceCounts: Record<string, number> = {};
  candidates.forEach((c) => {
    const band = c.confidence_band || 'Medium';
    confidenceCounts[band] = (confidenceCounts[band] || 0) + 1;
  });
  const qualityData = Object.entries(confidenceCounts).map(([band, count]) => ({ band, count }));
  // Define colors for quality pie chart
  const QA_COLORS: Record<string, string> = {
    'High Potential': '#D6FF61', // Lime green
    'Medium': '#8ACBE1', // Sky blue
    'Risk': '#F97D37', // Orange
    'Unknown': '#CCCCCC',
  };

  // Applications by Month
  const monthCounts: Record<string, number> = {};
  candidates.forEach((c) => {
    if (c.application_date) {
      const date = new Date(c.application_date);
      // format: "Jan 2026"
      const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    }
  });

  // Sort chronological
  const applicationsByMonth = Object.entries(monthCounts)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-charcoal-800 border-t-transparent mx-auto" />
          <p className="text-charcoal-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 custom-scrollbar overflow-y-auto h-full bg-cream pb-16">
      <div className="space-y-2">
        <h1 className="text-4xl font-serif font-bold text-charcoal-800">
          Analytics Dashboard
        </h1>
        <p className="text-base text-charcoal-500">
          Comprehensive insights into application trends and patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flat-card-hover">
          <CardHeader>
            <CardTitle>Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-serif font-bold text-charcoal-800">{total}</div>
            <p className="text-sm text-charcoal-500 mt-2">All time</p>
          </CardContent>
        </Card>

        <Card className="flat-card-hover">
          <CardHeader>
            <CardTitle>Acceptance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-serif font-bold text-charcoal-800">{acceptanceRate}%</div>
            <p className="text-sm text-charcoal-500 mt-2">
              {statusCounts.accepted} accepted of {total} total
            </p>
          </CardContent>
        </Card>

        <Card className="flat-card-hover">
          <CardHeader>
            <CardTitle>Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-serif font-bold text-charcoal-800">
              {statusCounts.pending + statusCounts.in_review}
            </div>
            <p className="text-sm text-charcoal-500 mt-2">Awaiting decision</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Graph 1: Applications Each Month */}
        {applicationsByMonth.length > 0 && (
          <Card className="flat-card">
            <CardHeader>
              <CardTitle>Applications per Month</CardTitle>
              <CardDescription>Volume of applications received over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={applicationsByMonth}>
                  <defs>
                    <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97D37" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#F97D37" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis dataKey="month" stroke="#3D3D3D" style={{ fontSize: '12px', fontWeight: '500' }} />
                  <YAxis stroke="#3D3D3D" style={{ fontSize: '12px', fontWeight: '500' }} allowDecimals={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="count" stroke="#F97D37" strokeWidth={3} fillOpacity={1} fill="url(#colorWave)" name="Applications" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Graph 2: Applications for each Role */}
        {roleDistributionData.length > 0 && (
          <Card className="flat-card">
            <CardHeader>
              <CardTitle>Applications by Role</CardTitle>
              <CardDescription>Distribution of candidates across target roles</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={roleDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis dataKey="role" stroke="#3D3D3D" style={{ fontSize: '12px', fontWeight: '500' }} />
                  <YAxis stroke="#3D3D3D" style={{ fontSize: '12px', fontWeight: '500' }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8ACBE1" name="Applications" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Graph 3: Application Quality */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flat-card">
          <CardHeader>
            <CardTitle>Application Quality Assessment</CardTitle>
            <CardDescription>Candidate distribution by AI-evaluated confidence bands</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={qualityData}
                  dataKey="count"
                  nameKey="band"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {qualityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={QA_COLORS[entry.band] || QA_COLORS['Unknown']} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="flat-card">
          <CardHeader>
            <CardTitle>Master Score Distribution</CardTitle>
            <CardDescription>Number of candidates grouped by overall skill score</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={scoreRanges}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis dataKey="range" stroke="#3D3D3D" style={{ fontSize: '12px', fontWeight: '500' }} />
                <YAxis stroke="#3D3D3D" style={{ fontSize: '12px', fontWeight: '500' }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#D6FF61" name="Candidates" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
