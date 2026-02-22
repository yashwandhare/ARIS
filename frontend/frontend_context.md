# IATS Frontend - Complete Codebase Documentation

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Architecture Design](#4-architecture-design)
5. [Design System](#5-design-system)
6. [Core Modules](#6-core-modules)
7. [Admin Dashboard](#7-admin-dashboard)
8. [Candidate Application Portal](#8-candidate-application-portal)
9. [Intern Training Portal](#9-intern-training-portal)
10. [Shared Components](#10-shared-components)
11. [State Management](#11-state-management)
12. [Routing Architecture](#12-routing-architecture)
13. [API Integration Patterns](#13-api-integration-patterns)
14. [Form Handling & Validation](#14-form-handling--validation)
15. [Data Models & Types](#15-data-models--types)
16. [Mock Data Strategy](#16-mock-data-strategy)
17. [Styling Guidelines](#17-styling-guidelines)
18. [Component Patterns](#18-component-patterns)
19. [Performance Considerations](#19-performance-considerations)
20. [Testing Strategy](#20-testing-strategy)
21. [Build & Deployment](#21-build--deployment)
22. [Development Guidelines](#22-development-guidelines)

---

## 1. Project Overview

### 1.1 Introduction

IATS (Intern Analytics & Training System) is a comprehensive web application designed to manage the complete lifecycle of internship programs. The frontend application serves three distinct user personas:

1. **Administrators** - Review applications, manage candidates, generate training plans, and track program analytics
2. **Candidates** - Submit applications through a structured, multi-step form interface
3. **Interns** - Track training progress, complete tasks, and monitor performance throughout the program

### 1.2 Application Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Candidate     │     │    Admin        │     │    Intern       │
│   Apply Portal  │────▶│   Dashboard     │────▶│    Portal       │
│                 │     │                 │     │                 │
│  - Role Select  │     │  - Review       │     │  - Tasks        │
│  - Apply Form   │     │  - Accept/Reject│     │  - Training     │
│  - Submit       │     │  - Generate Plan│     │  - Certificate  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 1.3 Key Features

- **AI-Assisted Evaluation**: Automated analysis of candidate profiles, GitHub activity, and resume parsing
- **Structured Training Plans**: Week-by-week curriculum with defined objectives and evaluation criteria
- **Task Management**: Complete task lifecycle from assignment to review with feedback
- **Performance Analytics**: Visual progress tracking with charts and detailed metrics
- **Certificate Generation**: Automatic certificate issuance upon program completion

---

## 2. Technology Stack

### 2.1 Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| TypeScript | 5.3.3 | Type safety |
| Vite | 5.0.12 | Build tool |
| React Router | 6.21.3 | Client-side routing |

### 2.2 UI Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| Radix UI | Various | Headless UI primitives |
| Tailwind CSS | 3.4.1 | Utility-first styling |
| shadcn/ui | Custom | Component library built on Radix |
| Lucide React | 0.316.0 | Icon library |
| Recharts | 2.10.4 | Charting library |

### 2.3 Form & State Management

| Library | Version | Purpose |
|---------|---------|---------|
| React Hook Form | 7.50.1 | Form state management |
| Zod | 3.22.4 | Schema validation |
| @hookform/resolvers | 3.3.4 | Form-Zod integration |
| TanStack Query | 5.17.19 | Server state management |

### 2.4 Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| TypeScript ESLint | TS-specific linting |
| PostCSS | CSS processing |
| Autoprefixer | CSS vendor prefixes |

---

## 3. Project Structure

### 3.1 Directory Overview

```
frontend/
├── src/
│   ├── main.tsx                    # Application entry point
│   ├── App.tsx                     # Root component with routing
│   ├── index.css                   # Global styles & Tailwind
│   │
│   ├── components/                 # Shared components
│   │   ├── layout/                 # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   └── select.tsx
│   │   ├── CandidateTable.tsx
│   │   ├── Filters.tsx
│   │   └── StatsCards.tsx
│   │
│   ├── pages/                      # Admin pages
│   │   ├── Dashboard.tsx
│   │   ├── ReviewRoom.tsx
│   │   ├── CandidateDetail.tsx
│   │   ├── Interns.tsx
│   │   ├── Analytics.tsx
│   │   ├── Settings.tsx
│   │   └── Apply.tsx
│   │
│   ├── features/                   # Feature modules
│   │   └── intern/
│   │       └── portal/             # Intern portal module
│   │           ├── InternLayout.tsx
│   │           ├── index.ts
│   │           ├── pages/
│   │           ├── components/
│   │           └── data/
│   │
│   ├── types/                      # Type definitions
│   │   ├── index.ts
│   │   └── features/
│   │       └── candidate/
│   │           └── portal/         # Candidate portal types
│   │               ├── types.ts
│   │               ├── constants.ts
│   │               ├── schemas/
│   │               ├── hooks/
│   │               ├── components/
│   │               └── services/
│   │
│   ├── lib/                        # Utilities
│   │   ├── index.ts
│   │   ├── utils.ts
│   │   └── constants.ts
│   │
│   └── data/                       # Mock data
│       ├── index.ts
│       └── mockCandidates.ts
│
├── public/                         # Static assets
├── index.html                      # HTML template
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript config
├── tsconfig.node.json              # Node TypeScript config
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── package.json                    # Dependencies
└── .eslintrc.cjs                   # ESLint configuration
```

### 3.2 Module Organization Pattern

Each feature module follows a consistent structure:

```
feature/
├── FeatureLayout.tsx       # Layout wrapper with navigation
├── index.ts                # Public exports
├── pages/                  # Route-level components
│   ├── PageOne.tsx
│   └── PageTwo.tsx
├── components/             # Feature-specific components
│   ├── ComponentA.tsx
│   └── ComponentB.tsx
├── data/                   # Mock data & types
│   └── mockData.ts
├── hooks/                  # Custom hooks (optional)
├── services/               # API services (optional)
└── schemas/                # Validation schemas (optional)
```

---

## 4. Architecture Design

### 4.1 High-Level Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                         App.tsx                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    QueryClientProvider                    │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │                  BrowserRouter                      │  │  │
│  │  │  ┌──────────────────────────────────────────────┐  │  │  │
│  │  │  │                   Routes                      │  │  │  │
│  │  │  │  ┌────────────┐ ┌────────────┐ ┌───────────┐ │  │  │  │
│  │  │  │  │  Public    │ │   Admin    │ │  Intern   │ │  │  │  │
│  │  │  │  │  Routes    │ │   Routes   │ │  Routes   │ │  │  │  │
│  │  │  │  └────────────┘ └────────────┘ └───────────┘ │  │  │  │
│  │  │  └──────────────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

### 4.2 Component Hierarchy

```
App
├── BrowserRouter
│   ├── Routes
│   │   ├── Route [path="/apply"]
│   │   │   └── CandidatePortalPage
│   │   │       ├── HeroSection
│   │   │       ├── RoleSelector
│   │   │       └── ApplicationForm
│   │   │           ├── PersonalSection
│   │   │           ├── ProfessionalSection
│   │   │           ├── EducationSection
│   │   │           ├── ExperienceSection
│   │   │           ├── MotivationSection
│   │   │           ├── ResumeUpload
│   │   │           └── PreviewSection
│   │   │
│   │   ├── Route [path="/intern/*"]
│   │   │   └── InternLayout
│   │   │       ├── Sidebar
│   │   │       └── Outlet
│   │   │           ├── InternDashboard
│   │   │           ├── TasksPage
│   │   │           ├── TaskDetailPage
│   │   │           ├── TrainingPlanPage
│   │   │           ├── PerformancePage
│   │   │           └── CertificatePage
│   │   │
│   │   └── Route [path="/*"]
│   │       └── AdminLayout
│   │           ├── Sidebar
│   │           ├── Header
│   │           └── MainContent
│   │               ├── Dashboard
│   │               ├── ReviewRoom
│   │               ├── CandidateDetail
│   │               ├── Interns
│   │               ├── Analytics
│   │               └── Settings
```

### 4.3 Data Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   User       │     │   React      │     │   Mock/      │
│   Action     │────▶│   Component  │────▶│   API        │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │   State      │
                     │   Update     │
                     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │   UI         │
                     │   Re-render  │
                     └──────────────┘
```

---

## 5. Design System

### 5.1 Color Palette

The application uses a carefully curated color palette designed for professionalism and clarity.

#### Primary Colors

```css
/* Background Colors */
--cream: #FAF8F5;           /* Primary background */
--cream-50: #FFFFFF;        /* Light variant */
--cream-100: #FAF8F5;       /* Standard */
--cream-200: #F5F2ED;       /* Slightly darker */
--cream-300: #EDE8E0;       /* Card backgrounds */
--cream-400: #E5DED3;       /* Hover states */

/* Text Colors */
--charcoal: #3D3D3D;        /* Primary text */
--charcoal-50: #F5F5F5;     /* Lightest */
--charcoal-100: #E5E5E5;
--charcoal-200: #CCCCCC;    /* Borders */
--charcoal-300: #B3B3B3;
--charcoal-400: #999999;
--charcoal-500: #808080;    /* Secondary text */
--charcoal-600: #666666;
--charcoal-700: #4D4D4D;
--charcoal-800: #3D3D3D;    /* Headings */
--charcoal-900: #2A2A2A;    /* Darkest */
```

#### Accent Colors

```css
/* Sky Blue - Primary Actions */
--sky: #8ACBE1;

/* Lime Green - Success States */
--lime: #D6FF61;

/* Orange - Warnings & Errors */
--orange: #F97D37;
```

### 5.2 Typography

#### Font Families

```css
/* Primary Font - Body Text */
font-sans: 'Inter', system-ui, sans-serif;

/* Heading Font - Serif */
font-serif: 'Playfair Display', Georgia, serif;
```

#### Typography Scale

```css
/* Headings */
h1: 3rem (48px) - Page titles
h2: 1.875rem (30px) - Section titles
h3: 1.5rem (24px) - Sub-sections
h4: 1.25rem (20px) - Card titles

/* Body Text */
text-base: 1rem (16px) - Standard body
text-sm: 0.875rem (14px) - Secondary text
text-xs: 0.75rem (12px) - Captions, labels
```

### 5.3 Spacing System

The application uses a consistent 4px base unit:

```css
/* Spacing Scale */
0: 0px
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
8: 32px
10: 40px
12: 48px
16: 64px
```

### 5.4 Component Styling Patterns

#### Card Styles

```css
/* Flat Card - Primary card style */
.flat-card {
  @apply bg-cream-100 border border-charcoal-200 rounded-xl;
}

/* Flat Card Hover - Interactive cards */
.flat-card-hover {
  @apply flat-card transition-colors duration-200 hover:border-charcoal-300;
}
```

#### Blur Effects

```css
/* Sidebar Blur */
.sidebar-blur {
  backdrop-filter: blur(16px);
  background-color: rgba(250, 248, 245, 0.9);
}

/* Header Blur */
.header-blur {
  backdrop-filter: blur(16px);
  background-color: rgba(250, 248, 245, 0.9);
}
```

### 5.5 Border Radius

```css
--radius: 0.5rem (8px)      /* Standard */
rounded-lg: 0.5rem          /* Cards, inputs */
rounded-xl: 0.75rem         /* Large cards */
rounded-2xl: 1rem           /* Hero elements */
rounded-full: 9999px        /* Pills, avatars */
```

---

## 6. Core Modules

### 6.1 Module Overview

The application is divided into three distinct modules:

| Module | Path | Description |
|--------|------|-------------|
| Admin Dashboard | `/*` | Admin interface for managing candidates |
| Candidate Portal | `/apply` | Public application form |
| Intern Portal | `/intern/*` | Intern training dashboard |

### 6.2 Module Communication

Modules are designed to be independent but share:

- Common UI components (`/components/ui/`)
- Utility functions (`/lib/`)
- Type definitions (where applicable)
- Design tokens (colors, typography)

### 6.3 Module Entry Points

```typescript
// Admin Module
import { Dashboard } from '@/pages/Dashboard';

// Candidate Module
import { CandidatePortalPage } from '@/types/features/candidate/portal/CandidatePortalPage';

// Intern Module
import { InternLayout } from '@/features/intern/portal/InternLayout';
```

---

## 7. Admin Dashboard

### 7.1 Dashboard Page

**Location:** `src/pages/Dashboard.tsx`

The main admin dashboard provides an overview of all applications with filtering and quick actions.

#### Key Features:
- Statistics cards showing total applications, new this week, pending reviews
- Candidate table with sorting and filtering
- Quick access to candidate details and plan generation
- Filter controls for search, score, role, date, status, confidence

#### Component Structure:

```typescript
export function Dashboard() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    score: 'all',
    role: 'all',
    date: 'all',
    status: 'all',
    confidence: 'all',
  });
  const [showAll, setShowAll] = useState(false);

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter((candidate) => {
      // Filter logic for each criteria
    });
  }, [filters]);

  // Render dashboard with stats and candidate table
}
```

### 7.2 Review Room

**Location:** `src/pages/ReviewRoom.tsx`

Dedicated interface for reviewing pending and in-review candidates with quick actions.

#### Actions Available:
- View candidate details
- Generate training plan
- Accept application
- Reject application

### 7.3 Candidate Detail Page

**Location:** `src/pages/CandidateDetail.tsx`

Comprehensive view of individual candidate information with training plan generation.

#### Sections:
- Contact information
- Skill score, project depth, consistency metrics
- GitHub statistics with language breakdown (pie chart)
- Resume analysis (ATS score, skill keywords, project quality)
- Role match scores (bar chart)
- Profile analysis with learning gaps
- Training plan generator

#### Training Plan Generation:

```typescript
const handleGeneratePlanFn = useCallback(async (candidateData: Candidate, config: typeof planConfig) => {
  setGeneratingPlan(true);
  await simulateDelay(2000);
  
  const plan = `# Training Plan for ${candidateData.name}
  ## ${candidateData.role_alignment} - ${config.weeks} Week Program
  // ... plan content
  `;
  
  setTrainingPlan(plan);
  setGeneratingPlan(false);
}, []);
```

### 7.4 Interns Page

**Location:** `src/pages/Interns.tsx`

Shows all accepted interns with performance metrics and training progress.

#### Features:
- Active intern count
- Average progress percentage
- Top performer highlight
- Performance metrics chart (skill score, project depth, consistency)

### 7.5 Analytics Page

**Location:** `src/pages/Analytics.tsx`

System-wide analytics and trends visualization.

#### Charts:
- Application trends over 6 months (area chart)
- Applications by role (line chart)
- Key metrics (acceptance rate, avg review time, top skill gap)

### 7.6 Settings Page

**Location:** `src/pages/Settings.tsx`

Configuration interface for system settings.

#### Sections:
- System configuration (backend mode, API endpoint)
- Notification preferences
- Security settings (password management)

---

## 8. Candidate Application Portal

### 8.1 Overview

**Location:** `src/types/features/candidate/portal/`

The candidate portal is a public-facing application form for internship candidates.

### 8.2 Portal Structure

```
portal/
├── CandidatePortalPage.tsx    # Main entry component
├── types.ts                   # Type definitions
├── constants.ts               # Role options, company info
├── components/
│   ├── HeroSection.tsx        # Landing hero with CTA
│   ├── RoleSelector.tsx       # Role selection cards
│   ├── ApplicationForm.tsx    # Main form orchestrator
│   ├── PersonalSection.tsx    # Personal information
│   ├── ProfessionalSection.tsx # Professional profile
│   ├── EducationSection.tsx   # Education details
│   ├── ExperienceSection.tsx  # Experience & projects
│   ├── MotivationSection.tsx  # Motivation questions
│   ├── ResumeUpload.tsx       # Resume file upload
│   └── PreviewSection.tsx     # Application preview
├── schemas/
│   └── applicationSchema.ts   # Zod validation schemas
├── hooks/
│   ├── useApplicationForm.ts  # Form state management
│   └── useDebounce.ts         # Input debouncing
└── services/
    ├── githubValidation.ts    # GitHub profile validation
    └── submitApplication.ts   # Form submission
```

### 8.3 Role Selection

Candidates first select their desired role from predefined options:

```typescript
export const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'backend',
    title: 'Backend Developer',
    description: 'Build scalable server-side applications...',
    requirements: [...],
    duration: '3-6 months',
    commitment: '20-30 hours/week',
    location: 'Remote / Hybrid',
  },
  // ... more roles
];
```

### 8.4 Form Sections

#### Personal Information
- Full name, email, phone
- Age, location
- Availability (hours per day)

#### Professional Profile
- GitHub URL (with live validation)
- LinkedIn URL (optional)
- Portfolio URL (optional)
- Primary tech stack (multi-select)
- Years of experience
- Current status

#### Education
- Degree level (dropdown)
- Field of study
- Institution name
- Graduation year
- GPA (optional)

#### Experience & Projects
- Previous internship status
- Company and duration (conditional)
- Project links (minimum 2, maximum 5)

#### Motivation
- Why applying (min 50, max 1000 characters)
- Areas to improve (min 50, max 1000 characters)

#### Resume Upload
- PDF only, max 5MB
- Drag and drop support
- File validation

### 8.5 Validation Schema

```typescript
export const applicationFormSchema = z.object({
  roleSelected: z.string().min(1, 'Please select a role'),
  personal: personalInfoSchema,
  professional: professionalProfileSchema,
  education: educationSchema,
  experience: experienceSchema,
  motivation: motivationSchema,
  resume: resumeSchema,
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});
```

### 8.6 GitHub Validation

The portal includes real-time GitHub profile validation:

```typescript
export async function validateGitHubProfile(
  githubUrl: string
): Promise<GitHubValidationResult> {
  await simulateDelay(800);
  
  const match = githubUrl.match(/github\.com\/([a-zA-Z0-9_-]+)/);
  if (!match) {
    return {
      isValid: false,
      status: 'error',
      message: 'Invalid GitHub URL format',
    };
  }
  
  // Validation logic
}
```

### 8.7 Form Submission

```typescript
export async function submitApplication(
  formData: ApplicationFormData
): Promise<SubmissionResponse> {
  await simulateDelay(1500);
  
  const applicationId = uuidv4();
  const payload: ApplicationSubmission = {
    id: applicationId,
    role_selected: formData.roleSelected,
    personal: { ...formData.personal },
    professional: { ...formData.professional },
    // ... transform data
    status: 'pending',
  };
  
  return {
    success: true,
    applicationId,
    message: 'Application submitted successfully',
  };
}
```

---

## 9. Intern Training Portal

### 9.1 Overview

**Location:** `src/features/intern/portal/`

The intern portal is a training dashboard for accepted interns to track progress and complete tasks.

### 9.2 Portal Structure

```
portal/
├── InternLayout.tsx           # Layout with sidebar
├── index.ts                   # Exports
├── pages/
│   ├── InternDashboard.tsx    # Landing dashboard
│   ├── TasksPage.tsx          # Task list
│   ├── TaskDetailPage.tsx     # Task details
│   ├── TrainingPlanPage.tsx   # Training curriculum
│   ├── PerformancePage.tsx    # Performance analytics
│   └── CertificatePage.tsx    # Completion certificate
├── components/
│   ├── TaskCard.tsx           # Task preview card
│   ├── ProgressSummary.tsx    # Progress stats
│   ├── SkillLevelBadge.tsx    # Skill level indicator
│   ├── StatusBadge.tsx        # Task status badge
│   ├── SubmissionForm.tsx     # Task submission
│   └── WeekAccordion.tsx      # Training plan accordion
└── data/
    └── mockInternData.ts      # Intern data & types
```

### 9.3 Intern Dashboard

The dashboard provides a quick overview of progress and current tasks.

#### Key Components:
- Progress summary cards (completion %, current week, pending tasks, avg score)
- Current focus card with active task
- Recent feedback section
- Upcoming tasks preview

### 9.4 Tasks Page

Tasks are organized by week with filtering capabilities.

#### Task Statuses:
- **Pending**: Not yet started
- **Submitted**: Awaiting review
- **Reviewed**: Completed with feedback
- **Overdue**: Past deadline

```typescript
export function TasksPage() {
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([3]);

  const tasksByWeek = getTasksByWeek();
  // ... filtering logic
}
```

### 9.5 Task Detail Page

Comprehensive task view with submission capability.

#### Sections:
- Task description and requirements
- Skill level indicator
- Recommended resources
- Submission form (GitHub URL + notes)
- Review feedback (if reviewed)

#### Submission Handling:

```typescript
const handleSubmit = (githubUrl: string, notes: string) => {
  setIsSubmitting(true);
  
  setTimeout(() => {
    setTask({
      ...task,
      status: 'submitted',
      githubUrl,
      notes,
      submittedAt: new Date().toISOString().split('T')[0],
    });
    setIsSubmitting(false);
  }, 1500);
};
```

### 9.6 Training Plan Page

Read-only view of the complete training curriculum.

#### Week Plan Structure:

```typescript
export interface WeekPlan {
  week: number;
  title: string;
  topics: string[];
  objectives: string[];
  requiredSkills: string[];
  expectedOutput: string;
  evaluationCriteria: string[];
}
```

### 9.7 Performance Page

Analytics view with visual progress tracking.

#### Components:
- Score progression line chart
- Completion percentage
- Strengths and areas to improve
- Task performance summary

### 9.8 Certificate Page

Conditional certificate display based on completion.

```typescript
export function CertificatePage() {
  const progress = calculateOverallProgress();
  const isCompleted = progress >= 100;

  if (!isCompleted) {
    return <CertificateLockedView progress={progress} />;
  }

  return <CertificateDisplay certificate={mockCertificate} />;
}
```

---

## 10. Shared Components

### 10.1 UI Components (shadcn/ui)

All base UI components are located in `src/components/ui/` and follow shadcn/ui patterns.

#### Button

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-charcoal-800 text-cream hover:bg-charcoal-700",
        destructive: "bg-orange text-white hover:bg-orange/90",
        outline: "border border-charcoal-200 bg-transparent hover:bg-cream-200",
        secondary: "bg-lime text-charcoal-800 hover:bg-lime/80",
        ghost: "hover:bg-cream-200",
        link: "text-sky underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
  }
);
```

#### Card

```typescript
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-charcoal-200 bg-cream-100 text-charcoal-800 shadow-sm",
        className
      )}
      {...props}
    />
  )
);
```

#### Badge

```typescript
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-charcoal-800 text-cream",
        secondary: "border-transparent bg-lime text-charcoal-800",
        destructive: "border-transparent bg-orange text-white",
        outline: "text-charcoal-700",
      },
    },
  }
);
```

#### Input

```typescript
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-charcoal-200 bg-cream-50 px-3 py-2 text-sm",
          "ring-offset-cream file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-charcoal-400 focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-sky/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
```

#### Select

Built on Radix UI Select primitive with custom styling.

#### Dialog

Built on Radix UI Dialog primitive for modal interactions.

#### Dropdown Menu

Built on Radix UI Dropdown Menu for navigation menus.

#### Avatar

Built on Radix UI Avatar for user profile images.

### 10.2 Layout Components

#### Sidebar

```typescript
export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Review Room', path: '/review-room' },
    { icon: GraduationCap, label: 'Interns & Training', path: '/interns' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  // Render collapsible sidebar with navigation
}
```

#### Header

```typescript
export function Header() {
  return (
    <header className="h-16 header-blur px-6 flex items-center justify-between">
      <Badge variant="outline" className="gap-2">
        <div className="w-2 h-2 rounded-full bg-lime" />
        <span>Mock Mode</span>
      </Badge>

      {/* User dropdown menu */}
    </header>
  );
}
```

### 10.3 Feature Components

#### CandidateTable

Displays candidates in a table format with actions.

```typescript
interface CandidateTableProps {
  candidates: Candidate[];
  showActions?: boolean;
  showMore?: boolean;
  onShowMore?: () => void;
  onGeneratePlan?: (candidate: Candidate) => void;
}
```

#### Filters

Reusable filter component for candidate lists.

```typescript
interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}
```

#### StatsCards

Dashboard statistics cards with pie chart.

```typescript
interface StatsCardsProps {
  stats: DashboardStats;
}
```

---

## 11. State Management

### 11.1 Local State

Most components use React's built-in state management:

```typescript
// Simple state
const [filters, setFilters] = useState<FilterState>({...});

// Derived state
const filteredCandidates = useMemo(() => {
  return candidates.filter(...);
}, [candidates, filters]);

// Callback memoization
const handleAction = useCallback((id: string) => {
  // ...
}, [dependencies]);
```

### 11.2 React Query

TanStack Query is configured at the app root:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});
```

### 11.3 Form State

React Hook Form manages all form state:

```typescript
const {
  register,
  handleSubmit,
  watch,
  setValue,
  control,
  formState: { errors, isSubmitting },
} = useForm<ApplicationFormSchema>({
  resolver: zodResolver(applicationFormSchema),
  defaultValues: {...},
});
```

### 11.4 URL State

React Router handles URL-based state:

```typescript
const { id } = useParams();
const location = useLocation();
const navigate = useNavigate();

// Navigation with state
navigate('/candidate/123', { state: { generatePlan: true } });

// Reading state
const location = useLocation();
if (location.state?.generatePlan) {
  // Auto-generate plan
}
```

---

## 12. Routing Architecture

### 12.1 Route Configuration

Routes are defined in `App.tsx`:

```typescript
<Routes>
  {/* Public Route */}
  <Route path="/apply" element={<Apply />} />

  {/* Intern Portal */}
  <Route path="/intern" element={<InternLayout />}>
    <Route index element={<InternDashboard />} />
    <Route path="tasks" element={<TasksPage />} />
    <Route path="tasks/:taskId" element={<TaskDetailPage />} />
    <Route path="training" element={<TrainingPlanPage />} />
    <Route path="performance" element={<PerformancePage />} />
    <Route path="certificate" element={<CertificatePage />} />
  </Route>

  {/* Admin Routes */}
  <Route path="/*" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="review-room" element={<ReviewRoom />} />
    {/* ... more routes */}
  </Route>
</Routes>
```

### 12.2 Route Protection

Currently, routes are not protected. In production, implement authentication:

```typescript
// Future implementation
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;
  
  return children;
};
```

### 12.3 Layout Routes

Layout routes use the Outlet pattern:

```typescript
export function InternLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
```

---

## 13. API Integration Patterns

### 13.1 Current Mock Strategy

All API calls are currently mocked:

```typescript
export async function submitApplication(formData: ApplicationFormData): Promise<SubmissionResponse> {
  // Simulate network delay
  await simulateDelay(1500);

  // Generate unique ID
  const applicationId = uuidv4();

  // Log for debugging
  console.log('Application Submission:', payload);

  // Simulate occasional errors
  const shouldFail = Math.random() < 0.05;
  if (shouldFail) {
    throw new Error('Network error: Failed to submit application.');
  }

  return { success: true, applicationId };
}
```

### 13.2 Future API Integration

Replace mock services with actual API calls:

```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// services/applicationService.ts
export const applicationService = {
  submit: (data: ApplicationFormData) => 
    api.post('/applications', data),
  
  getById: (id: string) => 
    api.get(`/applications/${id}`),
  
  updateStatus: (id: string, status: string) => 
    api.patch(`/applications/${id}/status`, { status }),
};
```

### 13.3 React Query Integration

```typescript
// hooks/useApplication.ts
export function useApplication(id: string) {
  return useQuery({
    queryKey: ['application', id],
    queryFn: () => applicationService.getById(id),
    enabled: !!id,
  });
}

export function useSubmitApplication() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: applicationService.submit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
}
```

---

## 14. Form Handling & Validation

### 14.1 Zod Schema Definition

All forms use Zod for validation:

```typescript
export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits')
    .regex(/^[+]?[0-9\s-()]+$/, 'Please enter a valid phone number')
    .trim(),
  age: z
    .number()
    .int('Age must be a whole number')
    .min(18, 'You must be at least 18 years old')
    .max(65, 'Age must be less than 65'),
});
```

### 14.2 Complex Validation Patterns

#### Conditional Validation

```typescript
export const experienceSchema = z.object({
  hasPreviousInternship: z.boolean(),
  company: z
    .string()
    .max(100, 'Company name must not exceed 100 characters')
    .optional()
    .or(z.literal(''))
    .transform(val => val || undefined),
  // company is required only if hasPreviousInternship is true
}).refine(
  (data) => !data.hasPreviousInternship || data.company,
  { message: 'Company name is required', path: ['company'] }
);
```

#### Array Validation

```typescript
export const experienceSchema = z.object({
  projectLinks: z
    .array(projectLinkSchema)
    .min(2, 'Please provide at least 2 project links')
    .max(5, 'Maximum 5 project links allowed'),
});

const projectLinkSchema = z.object({
  url: z.string().url('Please enter a valid project URL'),
  description: z.string().min(10).max(300),
});
```

#### File Validation

```typescript
export const resumeSchema = z.object({
  file: z.instanceof(File).nullable(),
  fileName: z.string(),
  fileSize: z.number(),
}).refine(
  (data) => {
    if (!data.file) return false;
    return data.file.type === 'application/pdf';
  },
  { message: 'Resume must be a PDF file' }
).refine(
  (data) => {
    if (!data.file) return false;
    return data.file.size <= 5 * 1024 * 1024; // 5MB
  },
  { message: 'Resume file size must not exceed 5MB' }
);
```

### 14.3 Form Component Pattern

```typescript
export function PersonalSection({ register, errors }: PersonalSectionProps) {
  return (
    <Card className="flat-card">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-charcoal-700">
            Full Name <span className="text-orange">*</span>
          </label>
          <Input
            {...register('personal.fullName')}
            placeholder="John Doe"
            className={errors.personal?.fullName ? 'border-orange' : ''}
          />
          {errors.personal?.fullName && (
            <p className="text-sm text-orange">{errors.personal.fullName.message}</p>
          )}
        </div>
        {/* More fields */}
      </CardContent>
    </Card>
  );
}
```

### 14.4 Custom Hooks for Forms

```typescript
export function useApplicationForm(selectedRole: string) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormSchema>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: { /* initial values */ },
  });

  useEffect(() => {
    setValue('roleSelected', selectedRole);
  }, [selectedRole, setValue]);

  const mutation = useMutation({
    mutationFn: (data: ApplicationFormData) => submitApplication(data),
    onError: (error: Error) => {
      setSubmitError(error.message);
    },
  });

  const onSubmit = async (data: ApplicationFormSchema) => {
    setSubmitError(null);
    try {
      const result = await mutation.mutateAsync(data as ApplicationFormData);
      return { success: true, applicationId: result.applicationId };
    } catch (error) {
      return { success: false, applicationId: '' };
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    control,
    isSubmitting: isSubmitting || mutation.isPending,
    submitError,
    onSubmit,
  };
}
```

---

## 15. Data Models & Types

### 15.1 Core Types

#### Candidate (Admin)

```typescript
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
```

#### Intern Profile

```typescript
export interface InternProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  location: string;
  programDuration: number;
  startDate: string;
  mentor: string;
  completionPercentage: number;
  currentWeek: number;
  averageScore: number;
  strengths: string[];
  areasToImprove: string[];
}
```

#### Task

```typescript
export type TaskStatus = 'pending' | 'submitted' | 'reviewed' | 'overdue';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Task {
  id: string;
  title: string;
  description: string;
  week: number;
  deadline: string;
  status: TaskStatus;
  score?: number;
  feedback?: string;
  requirements: string[];
  skillLevel: SkillLevel;
  resources: { title: string; url: string }[];
  submittedAt?: string;
  githubUrl?: string;
  notes?: string;
}
```

#### Week Plan

```typescript
export interface WeekPlan {
  week: number;
  title: string;
  topics: string[];
  objectives: string[];
  requiredSkills: string[];
  expectedOutput: string;
  evaluationCriteria: string[];
}
```

#### Application Form Data

```typescript
export interface ApplicationFormData {
  roleSelected: string;
  personal: PersonalInfo;
  professional: ProfessionalProfile;
  education: Education;
  experience: Experience;
  motivation: Motivation;
  resume: ResumeFile;
  termsAccepted: boolean;
}
```

### 15.2 Filter Types

```typescript
export interface FilterState {
  search: string;
  score: 'all' | 'low' | 'medium' | 'high';
  role: string;
  date: string;
  status: string;
  confidence: string;
}

export interface DashboardStats {
  total_applications: number;
  new_this_week: number;
  pending_review: number;
  accepted: number;
  rejected: number;
}
```

### 15.3 Admin User

```typescript
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | undefined;
  role: 'admin' | 'reviewer';
}
```

---

## 16. Mock Data Strategy

### 16.1 Mock Data Location

All mock data is centralized:

- Admin data: `src/data/mockCandidates.ts`
- Intern data: `src/features/intern/portal/data/mockInternData.ts`
- Candidate portal: `src/types/features/candidate/portal/constants.ts`

### 16.2 Mock Data Patterns

#### Realistic Indian Names

```typescript
const internNames = [
  'Aarav Sharma',
  'Priya Iyer',
  'Rahul Verma',
  'Sneha Nair',
  'Karthik Reddy',
  'Divya Nair',
  'Tanvi Bhatia',
  'Aditya Verma',
  'Meera Krishnan',
  'Ishita Malhotra',
];
```

#### Realistic Task Data

```typescript
export const mockTasks: Task[] = [
  {
    id: 'task-001',
    title: 'Setup Development Environment',
    description: 'Configure your local development environment...',
    week: 1,
    deadline: '2026-01-07',
    status: 'reviewed',
    score: 85,
    feedback: 'Excellent setup with clear documentation...',
    requirements: [...],
    skillLevel: 'beginner',
    resources: [...],
  },
  // ... more tasks
];
```

#### Helper Functions

```typescript
export function getTasksByWeek(): Record<number, Task[]> {
  const grouped: Record<number, Task[]> = {};
  mockTasks.forEach(task => {
    if (!grouped[task.week]) {
      grouped[task.week] = [];
    }
    grouped[task.week].push(task);
  });
  return grouped;
}

export function getPendingTasks(): Task[] {
  return mockTasks.filter(t => t.status === 'pending' || t.status === 'overdue');
}

export function calculateOverallProgress(): number {
  const total = mockTasks.length;
  const completed = mockTasks.filter(t => t.status === 'reviewed').length;
  return Math.round((completed / total) * 100);
}
```

### 16.3 Mock Service Utilities

```typescript
export function simulateDelay(ms: number = 1500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

---

## 17. Styling Guidelines

### 17.1 Tailwind Configuration

```javascript
// tailwind.config.js
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        charcoal: { /* scale */ },
        cream: { /* scale */ },
        sky: '#8ACBE1',
        lime: '#D6FF61',
        orange: '#F97D37',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 17.2 Utility Classes

Custom utility classes defined in `index.css`:

```css
@layer utilities {
  .flat-card {
    @apply bg-cream-100 border border-charcoal-200 rounded-xl;
  }
  
  .flat-card-hover {
    @apply flat-card transition-colors duration-200 hover:border-charcoal-300;
  }
  
  .sidebar-blur {
    backdrop-filter: blur(16px);
    background-color: rgba(250, 248, 245, 0.9);
  }
  
  .header-blur {
    backdrop-filter: blur(16px);
    background-color: rgba(250, 248, 245, 0.9);
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-charcoal-300 rounded-full;
  }
}
```

### 17.3 Component Styling Patterns

#### Conditional Classes

```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  anotherCondition && "other-classes"
)}>
```

#### Status-Based Styling

```typescript
const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-sky/30 text-charcoal-800 border border-sky/50',
  },
  submitted: {
    label: 'Submitted',
    className: 'bg-cream-200 text-charcoal-700 border border-charcoal-200',
  },
  reviewed: {
    label: 'Reviewed',
    className: 'bg-lime/30 text-charcoal-800 border border-lime/50',
  },
  overdue: {
    label: 'Overdue',
    className: 'bg-orange/30 text-charcoal-800 border border-orange/50',
  },
};
```

### 17.4 Responsive Design

```typescript
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Cards */}
</div>

// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl">

// Conditional rendering for mobile
<div className="hidden md:block">
  <FullSidebar />
</div>
<div className="md:hidden">
  <MobileSidebar />
</div>
```

---

## 18. Component Patterns

### 18.1 Container/Presentational Pattern

```typescript
// Container (handles logic)
export function Dashboard() {
  const [filters, setFilters] = useState<FilterState>({...});
  const filteredCandidates = useMemo(() => {...}, [filters]);

  return (
    <DashboardView 
      candidates={filteredCandidates}
      filters={filters}
      onFilterChange={setFilters}
    />
  );
}

// Presentational (handles rendering)
export function DashboardView({ candidates, filters, onFilterChange }) {
  return (
    <div>
      <Filters filters={filters} onFilterChange={onFilterChange} />
      <CandidateTable candidates={candidates} />
    </div>
  );
}
```

### 18.2 Composition Pattern

```typescript
// Compose components through children
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### 18.3 Render Props Pattern

```typescript
// For reusable logic
export function DataLoader({ url, children }) {
  const { data, isLoading, error } = useQuery({ queryKey: [url] });
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return children(data);
}

// Usage
<DataLoader url="/api/candidates">
  {(candidates) => <CandidateTable candidates={candidates} />}
</DataLoader>
```

### 18.4 Custom Hook Pattern

```typescript
// Extract logic into hooks
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
const debouncedSearch = useDebounce(searchTerm, 300);
```

### 18.5 Higher-Order Component Pattern

```typescript
// For cross-cutting concerns
export function withAuth<P>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth();
    
    if (isLoading) return <LoadingSpinner />;
    if (!user) return <Navigate to="/login" />;
    
    return <Component {...props} />;
  };
}
```

---

## 19. Performance Considerations

### 19.1 Code Splitting (Recommended)

```typescript
// Lazy load pages
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Analytics = lazy(() => import('@/pages/Analytics'));

// With suspense
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<Dashboard />} />
  </Routes>
</Suspense>
```

### 19.2 Memoization

```typescript
// Memoize expensive computations
const filteredCandidates = useMemo(() => {
  return candidates.filter(/* complex logic */);
}, [candidates, filters]);

// Memoize callbacks
const handleAction = useCallback((id: string) => {
  // action logic
}, [dependencies]);

// Memoize components
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // render
});
```

### 19.3 Virtualization (For Large Lists)

```typescript
// Recommended for large lists
import { FixedSizeList } from 'react-window';

export function VirtualizedList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={80}
    >
      {({ index, style }) => (
        <div style={style}>
          <ItemComponent item={items[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}
```

### 19.4 Image Optimization

```typescript
// Lazy load images
<img 
  src={imageUrl}
  loading="lazy"
  alt={alt}
/>

// Use responsive images
<img
  srcSet={`${small} 300w, ${medium} 600w, ${large} 900w`}
  sizes="(max-width: 600px) 300px, (max-width: 900px) 600px, 900px"
/>
```

### 19.5 Bundle Size Management

Current bundle analysis:
- Main JS: ~1MB (275KB gzipped)
- CSS: ~30KB (6KB gzipped)

Recommendations:
- Implement route-based code splitting
- Use dynamic imports for heavy libraries (Recharts)
- Tree-shake unused dependencies

---

## 20. Testing Strategy

### 20.1 Testing Stack (Recommended)

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "vitest": "^1.0.0",
    "jsdom": "^24.0.0"
  }
}
```

### 20.2 Unit Test Examples

```typescript
// utils.test.ts
import { describe, it, expect } from 'vitest';
import { getScoreLabel, getConfidenceColor } from './utils';

describe('getScoreLabel', () => {
  it('returns "high" for scores >= 80', () => {
    expect(getScoreLabel(80)).toBe('high');
    expect(getScoreLabel(95)).toBe('high');
  });

  it('returns "medium" for scores 50-79', () => {
    expect(getScoreLabel(50)).toBe('medium');
    expect(getScoreLabel(79)).toBe('medium');
  });

  it('returns "low" for scores < 50', () => {
    expect(getScoreLabel(49)).toBe('low');
    expect(getScoreLabel(0)).toBe('low');
  });
});
```

### 20.3 Component Test Examples

```typescript
// TaskCard.test.tsx
import { render, screen } from '@testing-library/react';
import { TaskCard } from './TaskCard';

describe('TaskCard', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'Test description',
    week: 1,
    deadline: '2026-01-15',
    status: 'pending',
    requirements: [],
    skillLevel: 'beginner',
    resources: [],
  };

  it('renders task title', () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('shows pending status', () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });
});
```

### 20.4 Integration Test Examples

```typescript
// ApplicationForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApplicationForm } from './ApplicationForm';

describe('ApplicationForm', () => {
  it('validates required fields', async () => {
    render(<ApplicationForm selectedRole="backend" />);
    
    const submitButton = screen.getByText('Submit Application');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/full name must be at least 2 characters/i)).toBeInTheDocument();
    });
  });

  it('submits valid form', async () => {
    const user = userEvent.setup();
    render(<ApplicationForm selectedRole="backend" />);
    
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    // ... fill other fields
    
    await user.click(screen.getByText('Submit Application'));
    
    await waitFor(() => {
      expect(screen.getByText(/application submitted/i)).toBeInTheDocument();
    });
  });
});
```

---

## 21. Build & Deployment

### 21.1 Build Commands

```bash
# Development server
npm run dev

# Type checking
npx tsc --noEmit

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### 21.2 Build Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['recharts'],
        },
      },
    },
  },
});
```

### 21.3 Environment Variables

```bash
# .env.local
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=IATS
VITE_ENABLE_MOCK_API=true
```

### 21.4 Deployment Checklist

- [ ] Update environment variables for production
- [ ] Run type checking (`tsc --noEmit`)
- [ ] Run linting (`npm run lint`)
- [ ] Build production bundle (`npm run build`)
- [ ] Test production build locally (`npm run preview`)
- [ ] Configure proper caching headers
- [ ] Set up CDN for static assets
- [ ] Configure proper CSP headers
- [ ] Enable gzip/brotli compression

---

## 22. Development Guidelines

### 22.1 Code Style

- Use TypeScript for all new files
- Use functional components with hooks
- Prefer named exports over default exports
- Use const assertions for constants
- Use meaningful variable and function names

### 22.2 Component Naming

```typescript
// Components: PascalCase
export function CandidateTable() {}
export function TaskCard() {}

// Hooks: camelCase with 'use' prefix
export function useApplicationForm() {}
export function useDebounce() {}

// Utilities: camelCase
export function formatDate() {}
export function getScoreLabel() {}

// Types: PascalCase
export interface Candidate {}
export type TaskStatus = 'pending' | 'submitted';
```

### 22.3 File Naming

```
Components: PascalCase.tsx (e.g., CandidateTable.tsx)
Hooks: camelCase.ts (e.g., useDebounce.ts)
Types: camelCase.ts (e.g., types.ts)
Utilities: camelCase.ts (e.g., utils.ts)
Constants: camelCase.ts (e.g., constants.ts)
Pages: PascalCase.tsx (e.g., Dashboard.tsx)
```

### 22.4 Import Organization

```typescript
// 1. React imports
import { useState, useEffect } from 'react';

// 2. Third-party imports
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

// 3. Internal imports
import { Candidate } from '@/types';
import { formatDate } from '@/lib/utils';

// 4. Relative imports
import { TaskCard } from './TaskCard';
import { mockData } from './data';
```

### 22.5 Comment Guidelines

```typescript
// Use JSDoc for public APIs
/**
 * Validates a GitHub profile URL
 * @param githubUrl - The GitHub URL to validate
 * @returns Validation result with status and message
 */
export function validateGitHubProfile(githubUrl: string): ValidationResult {
  // Implementation
}

// Use inline comments sparingly for complex logic
const score = Math.round(
  (skillScore * 0.4) +      // Weight skill score at 40%
  (projectDepth * 0.35) +    // Project depth at 35%
  (consistency * 0.25)       // Consistency at 25%
);
```

### 22.6 Error Handling

```typescript
// Use error boundaries for component errors
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

// Handle async errors with try-catch
const handleSubmit = async (data: FormData) => {
  try {
    setIsSubmitting(true);
    await submitApplication(data);
  } catch (error) {
    if (error instanceof Error) {
      setSubmitError(error.message);
    } else {
      setSubmitError('An unexpected error occurred');
    }
  } finally {
    setIsSubmitting(false);
  }
};
```

### 22.7 Accessibility Guidelines

```typescript
// Use semantic HTML
<main>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
  <article>
    <h1>Title</h1>
    <p>Content</p>
  </article>
</main>

// Add ARIA attributes
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  aria-controls="dialog-id"
>
  <X className="h-4 w-4" />
</button>

// Use proper focus management
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (isOpen) {
    inputRef.current?.focus();
  }
}, [isOpen]);

// Ensure color contrast
// Minimum 4.5:1 for normal text, 3:1 for large text
```

---

## Appendix A: File Reference

### A.1 All Source Files

```
src/
├── main.tsx                          (11 lines)
├── App.tsx                           (71 lines)
├── index.css                         (123 lines)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                (88 lines)
│   │   └── Sidebar.tsx               (106 lines)
│   ├── ui/
│   │   ├── avatar.tsx                (40 lines)
│   │   ├── badge.tsx                 (40 lines)
│   │   ├── button.tsx                (56 lines)
│   │   ├── card.tsx                  (62 lines)
│   │   ├── dialog.tsx                (95 lines)
│   │   ├── dropdown-menu.tsx         (105 lines)
│   │   ├── input.tsx                 (42 lines)
│   │   └── select.tsx                (115 lines)
│   ├── CandidateTable.tsx            (153 lines)
│   ├── Filters.tsx                   (130 lines)
│   └── StatsCards.tsx                (95 lines)
│
├── pages/
│   ├── Dashboard.tsx                 (98 lines)
│   ├── ReviewRoom.tsx                (176 lines)
│   ├── CandidateDetail.tsx           (647 lines)
│   ├── Interns.tsx                   (144 lines)
│   ├── Analytics.tsx                 (114 lines)
│   ├── Settings.tsx                  (126 lines)
│   └── Apply.tsx                     (6 lines)
│
├── features/intern/portal/
│   ├── InternLayout.tsx              (146 lines)
│   ├── index.ts                      (9 lines)
│   ├── pages/
│   │   ├── InternDashboard.tsx       (156 lines)
│   │   ├── TasksPage.tsx             (107 lines)
│   │   ├── TaskDetailPage.tsx        (222 lines)
│   │   ├── TrainingPlanPage.tsx      (68 lines)
│   │   ├── PerformancePage.tsx       (140 lines)
│   │   └── CertificatePage.tsx       (148 lines)
│   ├── components/
│   │   ├── TaskCard.tsx              (99 lines)
│   │   ├── ProgressSummary.tsx       (76 lines)
│   │   ├── SkillLevelBadge.tsx       (33 lines)
│   │   ├── StatusBadge.tsx           (38 lines)
│   │   ├── SubmissionForm.tsx        (133 lines)
│   │   └── WeekAccordion.tsx         (127 lines)
│   └── data/
│       └── mockInternData.ts         (389 lines)
│
├── types/
│   ├── index.ts                      (77 lines)
│   └── features/candidate/portal/
│       ├── types.ts                  (134 lines)
│       ├── constants.ts              (98 lines)
│       ├── CandidatePortalPage.tsx   (77 lines)
│       ├── schemas/
│       │   └── applicationSchema.ts  (178 lines)
│       ├── hooks/
│       │   ├── useApplicationForm.ts (110 lines)
│       │   └── useDebounce.ts        (24 lines)
│       ├── components/
│       │   ├── ApplicationForm.tsx   (174 lines)
│       │   ├── EducationSection.tsx  (118 lines)
│       │   ├── ExperienceSection.tsx (196 lines)
│       │   ├── HeroSection.tsx       (51 lines)
│       │   ├── MotivationSection.tsx (86 lines)
│       │   ├── PersonalSection.tsx   (122 lines)
│       │   ├── PreviewSection.tsx    (212 lines)
│       │   ├── ProfessionalSection.tsx (236 lines)
│       │   ├── ResumeUpload.tsx      (198 lines)
│       │   └── RoleSelector.tsx      (114 lines)
│       └── services/
│           ├── githubValidation.ts   (99 lines)
│           └── submitApplication.ts  (129 lines)
│
├── lib/
│   ├── index.ts                      (3 lines)
│   ├── utils.ts                      (39 lines)
│   └── constants.ts                  (47 lines)
│
└── data/
    ├── index.ts                      (2 lines)
    └── mockCandidates.ts             (741 lines)
```

### A.2 Total Lines of Code

- **Total TypeScript/TSX**: ~8,124 lines
- **Configuration Files**: ~200 lines
- **Styles (CSS)**: ~123 lines

---

## Appendix B: Quick Reference

### B.1 Path Aliases

```typescript
'@/*' → './src/*'

// Usage
import { Button } from '@/components/ui/button';
import { Candidate } from '@/types';
import { formatDate } from '@/lib/utils';
```

### B.2 Common Imports

```typescript
// Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Icons
import { ArrowLeft, Calendar, Check, X, Loader2 } from 'lucide-react';

// Utilities
import { cn } from '@/lib/utils';
import { formatDate, getScoreLabel, getConfidenceColor } from '@/lib/utils';

// Router
import { useNavigate, useParams, useLocation } from 'react-router-dom';

// Forms
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Charts
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
```

### B.3 Common Patterns

```typescript
// Fetch data by ID
const { id } = useParams();
const item = mockData.find(item => item.id === id);

// Navigate with state
navigate('/path', { state: { key: value } });

// Read navigation state
const location = useLocation();
const { key } = location.state || {};

// Filter and memoize
const filtered = useMemo(() => 
  items.filter(item => condition),
  [items, dependencies]
);

// Form with validation
const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
  resolver: zodResolver(schema),
});
```

---

*Document Version: 1.0.0*
*Last Updated: February 2026*
*Total Lines: ~800*
