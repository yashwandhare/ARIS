import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockInternProfile, mockCertificate, calculateOverallProgress } from '../data/mockInternData';
import { Award, Download, Calendar, Building, CheckCircle } from 'lucide-react';

export function CertificatePage() {
  const profile = mockInternProfile;
  const certificate = mockCertificate;
  const progress = calculateOverallProgress();
  const isCompleted = progress >= 100;

  if (!isCompleted) {
    return (
      <div className="p-8 space-y-8 custom-scrollbar overflow-y-auto h-full bg-cream pb-16">
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold text-charcoal-800">
            Certificate
          </h1>
          <p className="text-base text-charcoal-500">
            Your program completion certificate.
          </p>
        </div>

        <Card className="flat-card max-w-2xl mx-auto">
          <CardContent className="py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-6">
              <Award className="h-10 w-10 text-charcoal-300" />
            </div>
            <h2 className="text-xl font-serif font-semibold text-charcoal-800 mb-2">
              Certificate Not Yet Available
            </h2>
            <p className="text-charcoal-500 max-w-md mx-auto mb-6">
              Complete all program requirements to unlock your candidateship completion certificate.
            </p>
            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-lg bg-cream-200">
              <div className="text-left">
                <p className="text-sm text-charcoal-500">Current Progress</p>
                <p className="text-2xl font-serif font-bold text-charcoal-800">{progress}%</p>
              </div>
              <div className="w-32 h-2 bg-cream-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-charcoal-400 mt-6">
              {100 - progress}% remaining to complete the program
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 custom-scrollbar overflow-y-auto h-full bg-cream pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-serif font-bold text-charcoal-800">
          Certificate
        </h1>
        <p className="text-base text-charcoal-500">
          Your placement completion certificate.
        </p>
      </div>

      <Card className="flat-card max-w-4xl mx-auto border-2 border-charcoal-200">
        <CardContent className="p-0">
          <div className="bg-cream-50 p-12 text-center border-b border-charcoal-200">
            <div className="w-16 h-16 bg-charcoal-800 rounded-lg flex items-center justify-center mx-auto mb-6">
              <span className="text-cream font-bold text-2xl font-serif">XYZ</span>
            </div>
            
            <p className="text-sm text-charcoal-500 uppercase tracking-widest mb-4">
              Certificate of Completion
            </p>
            
            <h1 className="text-3xl font-serif font-bold text-charcoal-800 mb-2">
              {certificate.internName}
            </h1>
            
            <p className="text-charcoal-500 mb-8">
              has successfully completed the
            </p>
            
            <h2 className="text-xl font-serif font-semibold text-charcoal-800 mb-2">
              {certificate.program}
            </h2>
            
            <p className="text-charcoal-600 mb-8">
              as a <span className="font-medium">{certificate.role}</span>
            </p>

            <div className="flex justify-center gap-8 text-sm text-charcoal-500 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{certificate.startDate} - {certificate.endDate}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {certificate.skills.map((skill, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-cream-100 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-charcoal-800 rounded-lg flex items-center justify-center">
                <Building className="h-5 w-5 text-cream" />
              </div>
              <div className="text-left">
                <p className="font-medium text-charcoal-800">{certificate.issuedBy}</p>
                <p className="text-xs text-charcoal-500">Mentor: {certificate.mentorName}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-charcoal-500">Certificate ID</p>
              <p className="font-mono text-sm text-charcoal-700">{certificate.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Download Certificate
        </Button>
        <Button variant="outline" className="gap-2">
          <CheckCircle className="h-4 w-4" />
          Verify Authenticity
        </Button>
      </div>

      <Card className="flat-card max-w-2xl mx-auto bg-sky/5 border-sky/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-sky/20 flex items-center justify-center shrink-0">
              <Award className="h-5 w-5 text-sky" />
            </div>
            <div>
              <h3 className="font-semibold text-charcoal-800 mb-1">
                Congratulations, {profile.name.split(' ')[0]}!
              </h3>
              <p className="text-sm text-charcoal-600">
                You have successfully completed the hiring program. This certificate 
                validates your skills and dedication. Add it to your LinkedIn profile or 
                portfolio to showcase your achievement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
