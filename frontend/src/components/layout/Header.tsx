import { Bell, RefreshCw, User, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { mockAdminUser } from '@/data/mockCandidates';

export function Header() {
  const handleSync = () => {
    console.log('Syncing data...');
  };

  return (
    <header className="h-16 header-blur px-6 flex items-center justify-between border-b border-charcoal-200">
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="gap-2">
          <div className="w-2 h-2 rounded-full bg-lime" />
          <span>Mock Mode</span>
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleSync}
          title="Sync Data"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="relative"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange text-white text-xs flex items-center justify-center rounded-full font-medium">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:bg-cream-200 transition-colors rounded-lg px-3 py-2">
              <div className="text-right">
                <p className="text-sm font-medium text-charcoal-800">{mockAdminUser.name}</p>
                <p className="text-xs text-charcoal-500 capitalize">{mockAdminUser.role}</p>
              </div>
              <Avatar>
                <AvatarImage src={mockAdminUser.avatar} />
                <AvatarFallback>
                  {mockAdminUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-orange">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
