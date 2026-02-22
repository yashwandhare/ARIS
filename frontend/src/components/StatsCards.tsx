import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { DashboardStats } from '@/types';

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const pieData = [
    { name: 'Accepted', value: stats.accepted, color: '#D6FF61' },
    { name: 'Rejected', value: stats.rejected, color: '#F97D37' },
    { name: 'Pending', value: stats.pending_review, color: '#8ACBE1' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="flat-card-hover">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Total Applications</CardTitle>
            <div className="p-2 rounded-lg bg-sky/20">
              <Users className="h-4 w-4 text-charcoal-700" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-serif font-bold text-charcoal-800">{stats.total_applications}</div>
          <p className="text-xs text-charcoal-500 mt-2">All time</p>
        </CardContent>
      </Card>

      <Card className="flat-card-hover">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">New This Week</CardTitle>
            <div className="p-2 rounded-lg bg-lime/20">
              <UserPlus className="h-4 w-4 text-charcoal-700" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-serif font-bold text-charcoal-800">{stats.new_this_week}</div>
          <p className="text-xs text-charcoal-500 mt-2">Last 7 days</p>
        </CardContent>
      </Card>

      <Card className="flat-card-hover">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Pending Review</CardTitle>
            <div className="p-2 rounded-lg bg-orange/20">
              <Clock className="h-4 w-4 text-charcoal-700" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-serif font-bold text-charcoal-800">{stats.pending_review}</div>
          <p className="text-xs text-charcoal-500 mt-2">Awaiting action</p>
        </CardContent>
      </Card>

      <Card className="flat-card-hover">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Legend 
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', fontWeight: '500' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
