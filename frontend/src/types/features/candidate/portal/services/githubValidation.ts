import { GitHubValidationResult } from '../types';
import { simulateDelay } from '@/lib/utils';

/**
 * Validates a GitHub profile URL
 * Mock implementation - in production, this would call the backend API
 */
export async function validateGitHubProfile(
  githubUrl: string
): Promise<GitHubValidationResult> {
  // Simulate API delay
  await simulateDelay(800);

  // Extract username from URL
  const match = githubUrl.match(/github\.com\/([a-zA-Z0-9_-]+)/);
  if (!match) {
    return {
      isValid: false,
      status: 'error',
      message: 'Invalid GitHub URL format',
    };
  }

  const username = match[1];

  // Mock validation logic
  // In production, this would be a real API call to GitHub API or backend
  const mockValidProfiles = [
    'priyasharma',
    'arjunpatel',
    'octocat',
    'torvalds',
    'gvanrossum',
  ];

  const mockNoRepoProfiles = ['newuser', 'emptyprofile'];

  if (mockValidProfiles.includes(username.toLowerCase())) {
    return {
      isValid: true,
      status: 'valid',
      message: 'GitHub profile verified',
    };
  }

  if (mockNoRepoProfiles.includes(username.toLowerCase())) {
    return {
      isValid: false,
      status: 'no_repos',
      message: 'No public repositories found',
    };
  }

  // Default to not found for demo purposes
  // In production, make actual GitHub API call
  const randomOutcome = Math.random();
  if (randomOutcome > 0.3) {
    return {
      isValid: true,
      status: 'valid',
      message: 'GitHub profile verified',
    };
  }

  return {
    isValid: false,
    status: 'not_found',
    message: 'GitHub profile not found',
  };
}

/**
 * Normalizes GitHub URL to standard format
 */
export function normalizeGitHubUrl(url: string): string {
  let normalized = url.trim();
  
  // Remove trailing slash
  normalized = normalized.replace(/\/$/, '');
  
  // Ensure https protocol
  if (!normalized.startsWith('http')) {
    normalized = 'https://' + normalized;
  }
  
  // Ensure www is removed for consistency
  normalized = normalized.replace('www.github.com', 'github.com');
  
  return normalized;
}

/**
 * Extracts username from GitHub URL
 */
export function extractGitHubUsername(url: string): string | null {
  const match = url.match(/github\.com\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}
