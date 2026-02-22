import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  BookOpen, 
  TrendingUp, 
  Award,
  ChevronLeft,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { mockInternProfile } from './data/mockInternData';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/intern' },
  { icon: ClipboardList, label: 'My Tasks', path: '/intern/tasks' },
  { icon: BookOpen, label: 'Training Plan', path: '/intern/training' },
  { icon: TrendingUp, label: 'Performance', path: '/intern/performance' },
  { icon: Award, label: 'Certificate', path: '/intern/certificate' },
];

export function InternLayout() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => {
    if (path === '/intern') {
      return location.pathname === '/intern';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-cream">
      <div
        className={cn(
          "h-screen sidebar-blur flex flex-col transition-all duration-300 border-r border-charcoal-200",
          isCollapsed ? "w-20" : "w-[280px]"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-charcoal-800 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-cream" />
              </div>
              <div>
                <h1 className="text-lg font-serif font-semibold text-charcoal-800">Intern Portal</h1>
                <p className="text-xs text-charcoal-500">Training Dashboard</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-cream-200 transition-colors border border-charcoal-200"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-charcoal-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-charcoal-600" />
            )}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-colors duration-200",
                  active
                    ? "bg-charcoal-800 text-cream"
                    : "text-charcoal-600 hover:bg-cream-200 hover:text-charcoal-800",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={cn(
          "p-4",
          isCollapsed && "px-2"
        )}>
          <div className={cn(
            "flat-card p-3",
            isCollapsed && "p-2"
          )}>
            {!isCollapsed ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-charcoal-800 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-cream font-bold text-sm">
                      {mockInternProfile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-charcoal-800 truncate">
                      {mockInternProfile.name}
                    </p>
                    <p className="text-xs text-charcoal-500 truncate">
                      {mockInternProfile.role}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-charcoal-200">
                  <div className="flex items-center justify-between text-xs text-charcoal-500">
                    <span>Progress</span>
                    <span className="font-medium text-charcoal-700">
                      Week {mockInternProfile.currentWeek}/{mockInternProfile.programDuration}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 bg-cream-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky rounded-full transition-all duration-500"
                      style={{ width: `${mockInternProfile.completionPercentage}%` }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-charcoal-800 rounded-lg flex items-center justify-center">
                  <span className="text-cream font-bold text-sm">
                    {mockInternProfile.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
