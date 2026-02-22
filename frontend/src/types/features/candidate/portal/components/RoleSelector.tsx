import { Check, Clock, MapPin, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { RoleOption } from '../types';
import { ROLE_OPTIONS } from '../constants';

interface RoleSelectorProps {
  selectedRole: string;
  onRoleSelect: (roleId: string) => void;
  error?: string;
}

export function RoleSelector({ selectedRole, onRoleSelect, error }: RoleSelectorProps) {
  return (
    <div className="space-y-6" id="role-selection">
      <div className="space-y-2">
        <h2 className="text-3xl font-serif font-bold text-charcoal-800">
          Select Your Role
        </h2>
        <p className="text-base text-charcoal-500">
          Choose the position that best aligns with your skills and career goals
        </p>
        {error && (
          <p className="text-sm text-orange">{error}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ROLE_OPTIONS.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            isSelected={selectedRole === role.id}
            onSelect={() => onRoleSelect(role.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface RoleCardProps {
  role: RoleOption;
  isSelected: boolean;
  onSelect: () => void;
}

function RoleCard({ role, isSelected, onSelect }: RoleCardProps) {
  return (
    <Card
      className={cn(
        'flat-card cursor-pointer transition-all duration-200 hover:shadow-sm relative',
        isSelected
          ? 'border-sky border-2 bg-sky/5'
          : 'hover:border-charcoal-300'
      )}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-sky rounded-full flex items-center justify-center shadow-md">
          <Check className="h-5 w-5 text-charcoal-800" />
        </div>
      )}

      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{role.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-charcoal-600 leading-relaxed">
          {role.description}
        </p>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-charcoal-700 uppercase tracking-wide">
            Key Requirements:
          </p>
          <ul className="space-y-1.5">
            {role.requirements.map((req, idx) => (
              <li key={idx} className="text-sm text-charcoal-600 flex items-start gap-2">
                <span className="text-sky mt-1">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 space-y-2 border-t border-charcoal-200">
          <div className="flex items-center gap-2 text-sm text-charcoal-600">
            <Calendar className="h-4 w-4 text-charcoal-500" />
            <span>{role.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-charcoal-600">
            <Clock className="h-4 w-4 text-charcoal-500" />
            <span>{role.commitment}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-charcoal-600">
            <MapPin className="h-4 w-4 text-charcoal-500" />
            <span>{role.location}</span>
          </div>
        </div>

        <Badge 
          variant={isSelected ? "secondary" : "outline"} 
          className="w-full justify-center mt-3"
        >
          {isSelected ? 'Selected' : 'Select Role'}
        </Badge>
      </CardContent>
    </Card>
  );
}
