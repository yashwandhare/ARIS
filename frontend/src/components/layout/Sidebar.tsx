import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Verification Center', path: '/review-room' },
  { icon: GraduationCap, label: 'Talent Management', path: '/interns' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
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
              <span className="text-cream font-bold text-xl font-serif">H</span>
            </div>
            <div>
              <h1 className="text-lg font-serif font-semibold text-charcoal-800">ARIS</h1>
              <p className="text-xs text-charcoal-500">Corporate Portal</p>
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
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-colors duration-200",
                isActive
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
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full bg-lime",
              isCollapsed && "mx-auto"
            )} />
            {!isCollapsed && (
              <div>
                <p className="text-xs font-medium text-charcoal-700">Backend: Mock</p>
                <p className="text-xs text-charcoal-500">System Active</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
