export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  role_alignment: string;
  skill_score: number;
  project_depth: number;
  consistency_score: number;
  confidence_band: 'High Potential' | 'Medium' | 'Risk';
  learning_gap: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'in_review';
  application_date: string;
  github: {
    url: string;
    repos: number;
    stars: number;
    languages: Record<string, number>;
    commits_90_days: number;
    last_activity: string;
  };
  linkedin?: string;
  resume?: string;
  resume_analysis: {
    ats_score: number;
    skill_keywords: string[];
    project_quality: number;
  };
  role_match_scores: Record<string, number>;
  analysis: string;
  image?: string;
}

export interface TrainingPlan {
  id: string;
  candidate_id: number;
  duration_weeks: number;
  hours_per_day: number;
  role_focus: string;
  focus_areas: string[];
  weekly_breakdown: WeeklyPlan[];
  generated_at: string;
  content: string;
}

export interface WeeklyPlan {
  week: number;
  topics: string[];
  deliverables: string[];
}

export interface DashboardStats {
  total_applications: number;
  new_this_week: number;
  pending_review: number;
  accepted: number;
  rejected: number;
}

export interface FilterState {
  search: string;
  score: 'all' | 'low' | 'medium' | 'high';
  role: string;
  date: string;
  status: string;
  confidence: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | undefined;
  role: 'admin' | 'reviewer';
}
