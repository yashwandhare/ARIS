import { useRef, useState, DragEvent } from 'react';
import { UseFormSetValue, FieldErrors, UseFormWatch } from 'react-hook-form';
import { Upload, FileText, CheckCircle2, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ApplicationFormSchema } from '../schemas/applicationSchema';
import { validateResumeFile } from '../services/submitApplication';
import { cn } from '@/lib/utils';

interface ResumeUploadProps {
  setValue: UseFormSetValue<ApplicationFormSchema>;
  errors: FieldErrors<ApplicationFormSchema>;
  watch: UseFormWatch<ApplicationFormSchema>;
}

export function ResumeUpload({ setValue, errors, watch }: ResumeUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const resume = watch('resume');
  const hasFile = resume?.file !== null;

  const handleFile = (file: File) => {
    const validation = validateResumeFile(file);

    if (!validation.isValid) {
      setUploadError(validation.error || 'Invalid file');
      return;
    }

    setUploadError(null);
    setValue('resume', {
      file,
      fileName: file.name,
      fileSize: file.size,
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemoveFile = () => {
    setValue('resume', {
      file: null,
      fileName: '',
      fileSize: 0,
    });
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Card className="flat-card">
      <CardHeader>
        <CardTitle className="text-xl">Resume Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasFile ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              'border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer',
              isDragging
                ? 'border-sky bg-sky/10'
                : 'border-charcoal-300 hover:border-sky hover:bg-sky/5',
              errors.resume && 'border-orange'
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-sky/20 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-sky" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-base font-medium text-charcoal-800">
                  Drop your resume here or click to browse
                </p>
                <p className="text-sm text-charcoal-500">
                  PDF only, maximum file size 5MB
                </p>
              </div>

              <Button type="button" variant="outline" size="sm">
                Select File
              </Button>
            </div>
          </div>
        ) : (
          <div className="flat-card p-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-lime/20 flex items-center justify-center shrink-0">
                <FileText className="h-6 w-6 text-charcoal-700" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal-800 truncate">
                      {resume.fileName}
                    </p>
                    <p className="text-xs text-charcoal-500 mt-1">
                      {formatFileSize(resume.fileSize)}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                    className="h-8 w-8 p-0 shrink-0"
                  >
                    <X className="h-4 w-4 text-orange" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle2 className="h-4 w-4 text-lime" />
                  <Badge variant="secondary" className="text-xs">
                    File uploaded successfully
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {uploadError && (
          <div className="flex items-center gap-2 text-sm text-orange bg-orange/10 p-3 rounded-lg">
            <X className="h-4 w-4" />
            <p>{uploadError}</p>
          </div>
        )}

        {errors.resume && (
          <p className="text-sm text-orange">{errors.resume.message}</p>
        )}

        <div className="flex items-start gap-2 text-xs text-charcoal-500 bg-cream-200 p-3 rounded-lg">
          <span className="text-sky mt-0.5">ℹ</span>
          <p>
            Your resume will be analyzed by our AI system to better understand your skills and
            experience. Make sure it's up to date and clearly formatted.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
