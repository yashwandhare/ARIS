import { useState, useRef } from 'react';
import { HeroSection } from './components/HeroSection';
import { RoleSelector } from './components/RoleSelector';
import { ApplicationForm } from './components/ApplicationForm';

export function CandidatePortalPage() {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const roleSelectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleApplyClick = () => {
    roleSelectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setShowForm(true);
    
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        <HeroSection onApplyClick={handleApplyClick} />

        <div ref={roleSelectionRef}>
          <RoleSelector
            selectedRole={selectedRole}
            onRoleSelect={handleRoleSelect}
            error={showForm && !selectedRole ? 'Please select a role to continue' : undefined}
          />
        </div>

        {showForm && selectedRole && (
          <div ref={formRef} className="scroll-mt-8">
            <ApplicationForm selectedRole={selectedRole} />
          </div>
        )}

        {!showForm && (
          <div className="text-center text-charcoal-500 py-16">
            <p className="text-base">
              Select a role above to begin your application
            </p>
          </div>
        )}
      </div>

      <footer className="border-t border-charcoal-200 bg-cream-100 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-charcoal-600">
              <p className="font-semibold">XYZ Technologies</p>
              <p className="text-charcoal-500">© 2024 All rights reserved</p>
            </div>
            <div className="flex gap-6 text-sm text-charcoal-600">
              <a href="#" className="hover:text-charcoal-800 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-charcoal-800 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-charcoal-800 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
