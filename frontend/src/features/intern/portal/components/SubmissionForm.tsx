import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Github, Send } from 'lucide-react';
import { Task } from '../data/mockInternData';

interface SubmissionFormProps {
  task: Task;
  onSubmit: (githubUrl: string, notes: string) => void;
  isSubmitting: boolean;
}

export function SubmissionForm({ task, onSubmit, isSubmitting }: SubmissionFormProps) {
  const [githubUrl, setGithubUrl] = useState(task.githubUrl || '');
  const [notes, setNotes] = useState(task.notes || '');
  const [urlError, setUrlError] = useState('');

  const validateGitHubUrl = (url: string): boolean => {
    if (!url) return false;
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+\/?$/;
    return githubRegex.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateGitHubUrl(githubUrl)) {
      setUrlError('Please enter a valid GitHub repository URL');
      return;
    }
    
    setUrlError('');
    onSubmit(githubUrl, notes);
  };

  if (task.status === 'submitted') {
    return (
      <div className="flat-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky/20 flex items-center justify-center">
            <Github className="h-5 w-5 text-sky" />
          </div>
          <div>
            <p className="font-medium text-charcoal-800">Submission Received</p>
            <p className="text-sm text-charcoal-500">
              Submitted on {new Date(task.submittedAt!).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="bg-cream-200 rounded-lg p-4 space-y-2">
          <p className="text-xs text-charcoal-500">Repository URL</p>
          <a 
            href={task.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-sky hover:underline break-all"
          >
            {task.githubUrl}
          </a>
          {task.notes && (
            <>
              <p className="text-xs text-charcoal-500 mt-3">Notes</p>
              <p className="text-sm text-charcoal-700">{task.notes}</p>
            </>
          )}
        </div>
        <p className="text-xs text-charcoal-500">
          Your submission is being reviewed. You will receive feedback soon.
        </p>
      </div>
    );
  }

  if (task.status === 'reviewed') {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-charcoal-700 flex items-center gap-2">
          <Github className="h-4 w-4" />
          GitHub Repository URL <span className="text-orange">*</span>
        </label>
        <Input
          value={githubUrl}
          onChange={(e) => {
            setGithubUrl(e.target.value);
            setUrlError('');
          }}
          placeholder="https://github.com/username/repository"
          className={urlError ? 'border-orange' : ''}
        />
        {urlError && (
          <p className="text-sm text-orange">{urlError}</p>
        )}
        <p className="text-xs text-charcoal-500">
          Provide a link to your completed work
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-charcoal-700">
          Notes (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any notes about your implementation, challenges faced, or questions..."
          rows={4}
          className="w-full px-3 py-2 text-sm rounded-lg border border-charcoal-200 bg-cream-50 focus:outline-none focus:ring-2 focus:ring-sky/50 focus:ring-offset-2 resize-none"
        />
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting || !githubUrl}
        className="w-full gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit Task
          </>
        )}
      </Button>
    </form>
  );
}
