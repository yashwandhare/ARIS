import { UseFormWatch, UseFormRegister, FieldErrors } from 'react-hook-form';
import { User, Mail, Phone, MapPin, Github, Briefcase, GraduationCap, FileText, CheckSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ApplicationFormSchema } from '../schemas/applicationSchema';
import { ROLE_OPTIONS } from '../constants';

interface PreviewSectionProps {
  watch: UseFormWatch<ApplicationFormSchema>;
  register: UseFormRegister<ApplicationFormSchema>;
  errors: FieldErrors<ApplicationFormSchema>;
}

export function PreviewSection({ watch, register, errors }: PreviewSectionProps) {
  const formData = watch();
  const selectedRole = ROLE_OPTIONS.find(r => r.id === formData.roleSelected);

  return (
    <Card className="flat-card">
      <CardHeader>
        <CardTitle className="text-xl">Application Preview</CardTitle>
        <p className="text-sm text-charcoal-500 mt-2">
          Please review your application before submitting
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Role Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-charcoal-700 uppercase tracking-wide">
            Selected Role
          </h3>
          {selectedRole ? (
            <div className="flat-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-charcoal-800">{selectedRole.title}</p>
                  <p className="text-sm text-charcoal-600 mt-1">{selectedRole.description}</p>
                </div>
                <Badge variant="secondary">Selected</Badge>
              </div>
            </div>
          ) : (
            <p className="text-sm text-orange">No role selected</p>
          )}
        </div>

        {/* Personal Information */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-charcoal-700 uppercase tracking-wide">
            Personal Information
          </h3>
          <div className="flat-card p-4 space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-charcoal-500" />
              <div>
                <p className="text-xs text-charcoal-500">Full Name</p>
                <p className="text-sm font-medium text-charcoal-800">
                  {formData.personal?.fullName || 'Not provided'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-charcoal-500" />
              <div>
                <p className="text-xs text-charcoal-500">Email</p>
                <p className="text-sm font-medium text-charcoal-800">
                  {formData.personal?.email || 'Not provided'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-charcoal-500" />
              <div>
                <p className="text-xs text-charcoal-500">Phone</p>
                <p className="text-sm font-medium text-charcoal-800">
                  {formData.personal?.phone || 'Not provided'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-charcoal-500" />
              <div>
                <p className="text-xs text-charcoal-500">Location</p>
                <p className="text-sm font-medium text-charcoal-800">
                  {formData.personal?.location || 'Not provided'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Profile */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-charcoal-700 uppercase tracking-wide">
            Professional Profile
          </h3>
          <div className="flat-card p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Github className="h-4 w-4 text-charcoal-500" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-charcoal-500">GitHub Profile</p>
                <p className="text-sm font-medium text-charcoal-800 truncate">
                  {formData.professional?.githubUrl || 'Not provided'}
                </p>
              </div>
            </div>

            {formData.professional?.primaryTechStack && formData.professional.primaryTechStack.length > 0 && (
              <div>
                <p className="text-xs text-charcoal-500 mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {formData.professional.primaryTechStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Briefcase className="h-4 w-4 text-charcoal-500" />
              <div>
                <p className="text-xs text-charcoal-500">Experience</p>
                <p className="text-sm font-medium text-charcoal-800">
                  {formData.professional?.yearsOfExperience || 0} years
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-charcoal-700 uppercase tracking-wide">
            Education
          </h3>
          <div className="flat-card p-4 space-y-2">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-4 w-4 text-charcoal-500" />
              <div>
                <p className="text-sm font-medium text-charcoal-800">
                  {formData.education?.degree || 'Not provided'}
                </p>
                <p className="text-xs text-charcoal-600">
                  {formData.education?.fieldOfStudy || 'Field of study not provided'}
                </p>
                <p className="text-xs text-charcoal-500">
                  {formData.education?.institution || 'Institution not provided'} •{' '}
                  {formData.education?.graduationYear || 'Year not provided'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resume */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-charcoal-700 uppercase tracking-wide">
            Resume
          </h3>
          <div className="flat-card p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-charcoal-500" />
              <div>
                <p className="text-xs text-charcoal-500">File</p>
                <p className="text-sm font-medium text-charcoal-800">
                  {formData.resume?.fileName || 'No file uploaded'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="border-t border-charcoal-200 pt-6 space-y-4">
          <div className="flex items-start gap-3">
            <input
              {...register('termsAccepted')}
              type="checkbox"
              id="terms"
              className="mt-1 h-4 w-4 rounded border-charcoal-300 text-sky focus:ring-sky"
            />
            <label htmlFor="terms" className="text-sm text-charcoal-700 cursor-pointer">
              <span className="font-medium">I confirm that all information provided is accurate</span>
              {' '}and I agree to the terms and conditions of the internship program. I understand
              that providing false information may result in disqualification.
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-sm text-orange flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              {errors.termsAccepted.message}
            </p>
          )}
        </div>

        <div className="bg-sky/10 border border-sky/30 rounded-lg p-4">
          <p className="text-sm text-charcoal-700">
            <span className="font-semibold">Next Steps:</span> After submitting your application,
            our AI system will analyze your profile. You'll receive an email notification within
            2-3 business days with the results of your evaluation and next steps.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
