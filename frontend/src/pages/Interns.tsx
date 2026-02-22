import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Award, Clock } from 'lucide-react';
import { Candidate } from '@/types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getApplications } from '@/lib/api';
import { mapAppToCandidate } from '@/pages/Dashboard';

export function Interns() {
  const [acceptedInterns, setAcceptedInterns] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getApplications();
        const all = data.map((app: any) => mapAppToCandidate(app));
        setAcceptedInterns(all.filter((c: Candidate) => c.status === 'accepted'));
      } catch (e) {
        console.error('Failed to load interns', e);
        setAcceptedInterns([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const performanceData = acceptedInterns.map(intern => ({
    name: intern.name.split(' ')[0],
    skill: intern.skill_score,
    project: intern.project_depth,
    consistency: intern.consistency_score,
  }));

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-charcoal-800 border-t-transparent mx-auto" />
          <p className="text-charcoal-500">Loading interns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 custom-scrollbar overflow-y-auto h-full bg-cream pb-16">
      <div className="space-y-2">
        <h1 className="text-4xl font-serif font-bold text-charcoal-800">
          Interns & Training
        </h1>
        <p className="text-base text-charcoal-500">
          Active interns performance and training progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="flat-card-hover">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Active Interns</CardTitle>
              <div className="p-2 rounded-lg bg-sky/20">
                <Users className="h-4 w-4 text-charcoal-700" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-serif font-bold text-charcoal-800">{acceptedInterns.length}</div>
            <p className="text-xs text-charcoal-500 mt-2">Currently training</p>
          </CardContent>
        </Card>

        <Card className="flat-card-hover">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Avg Score</CardTitle>
              <div className="p-2 rounded-lg bg-lime/20">
                <TrendingUp className="h-4 w-4 text-charcoal-700" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-serif font-bold text-charcoal-800">
              {acceptedInterns.length > 0
                ? Math.round(acceptedInterns.reduce((s, i) => s + i.skill_score, 0) / acceptedInterns.length)
                : 0}
            </div>
            <p className="text-xs text-charcoal-500 mt-2">Average skill score</p>
          </CardContent>
        </Card>

        <Card className="flat-card-hover">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Top Performer</CardTitle>
              <div className="p-2 rounded-lg bg-sky/20">
                <Award className="h-4 w-4 text-charcoal-700" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-charcoal-800">
              {acceptedInterns.length > 0
                ? acceptedInterns.reduce((best, i) => i.skill_score > best.skill_score ? i : best).name
                : 'N/A'}
            </div>
            <p className="text-xs text-charcoal-500 mt-1">Highest skill score</p>
          </CardContent>
        </Card>

        <Card className="flat-card-hover">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Avg Duration</CardTitle>
              <div className="p-2 rounded-lg bg-orange/20">
                <Clock className="h-4 w-4 text-charcoal-700" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-serif font-bold text-charcoal-800">8</div>
            <p className="text-xs text-charcoal-500 mt-2">Weeks to completion</p>
          </CardContent>
        </Card>
      </div>

      {acceptedInterns.length > 0 && (
        <Card className="flat-card">
          <CardHeader>
            <CardTitle>Intern Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#CCCCCC" />
                <XAxis dataKey="name" stroke="#3D3D3D" style={{ fontSize: '12px', fontWeight: '500' }} />
                <YAxis stroke="#3D3D3D" style={{ fontSize: '12px', fontWeight: '500' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px', fontWeight: '500' }} />
                <Bar dataKey="skill" fill="#8ACBE1" name="Skill Score" radius={[4, 4, 0, 0]} />
                <Bar dataKey="project" fill="#D6FF61" name="Project Depth" radius={[4, 4, 0, 0]} />
                <Bar dataKey="consistency" fill="#F97D37" name="Consistency" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <Card className="flat-card">
        <CardHeader>
          <CardTitle>Active Interns</CardTitle>
        </CardHeader>
        <CardContent>
          {acceptedInterns.length === 0 ? (
            <div className="text-center py-8 text-charcoal-500">
              No accepted interns yet. Accept candidates from the Review Room to see them here.
            </div>
          ) : (
            <div className="space-y-4">
              {acceptedInterns.map(intern => (
                <div key={intern.id} className="flex items-center justify-between p-4 rounded-xl bg-cream-200 border border-charcoal-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-charcoal-800 rounded-xl flex items-center justify-center">
                      <span className="text-cream font-bold text-lg">
                        {intern.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-800">{intern.name}</p>
                      <p className="text-sm text-charcoal-500">{intern.role_alignment}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="text-right">
                      <p className="text-sm font-medium text-charcoal-600">Skill Score</p>
                      <p className="text-2xl font-bold text-charcoal-800">{intern.skill_score}</p>
                    </div>
                    <Badge variant="secondary">Training</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
