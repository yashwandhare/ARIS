import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

export function getConfidenceColor(band: string): string {
  switch (band.toLowerCase()) {
    case 'high potential':
      return 'bg-lime/30 text-charcoal-800 border border-lime/50';
    case 'medium':
      return 'bg-sky/30 text-charcoal-800 border border-sky/50';
    case 'risk':
      return 'bg-orange/20 text-charcoal-800 border border-orange/50';
    default:
      return 'bg-cream-200 text-charcoal-800 border border-charcoal-200';
  }
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

export function simulateDelay(ms: number = 1500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
