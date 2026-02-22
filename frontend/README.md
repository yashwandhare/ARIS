# IATS Frontend - Intern Analytics & Training System

A modern, Neo-brutalist styled admin dashboard for managing intern applications, analytics, and training programs.

## 🎨 Design Features

- **Neo-brutalist Design**: Thick borders, hard shadows, high contrast
- **Glassmorphism Elements**: Subtle backdrop blur effects on key UI components
- **Responsive Layout**: 35% collapsible sidebar, 65% content area
- **Modern Stack**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui

## 📋 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (no frameworks)
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router v6
- **State Management**: TanStack Query
- **Charts**: Recharts
- **Icons**: Lucide React

## 🎯 Features

### Dashboard
- Welcome section with admin greeting
- 4 statistic cards with live data
- Interactive pie chart for status breakdown
- Advanced filtering system (search, score, role, date, status, confidence)
- Candidate table with pagination
- "Show More" functionality

### Review Room
- Dedicated page for candidates in review
- All filtering capabilities from dashboard
- Accept/Reject actions
- Quick navigation to candidate profiles

### Candidate Detail View
- Comprehensive profile with collapsible sections
- Contact information with clickable links
- GitHub statistics and language breakdown
- Resume analysis scores
- Role match comparison charts
- Profile analysis with learning gaps
- **Training Plan Generator**:
  - Configurable duration (4-16 weeks)
  - Daily hours selection (2-8 hours)
  - Role focus customization
  - AI-like generated comprehensive plans
  - Save and download functionality

### Interns & Training
- Active intern statistics
- Performance metrics visualization
- Individual intern cards with progress
- Training completion tracking

### Analytics
- 6-month application trends
- Role distribution analysis
- Key performance metrics
- Acceptance rate tracking

### Settings
- System configuration
- Backend mode switching (Mock/Live)
- Notification preferences
- Security settings

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Color Palette

The Neo-brutalist theme uses these colors:

- **neo-dark**: `#1F1F1F` - Primary dark (borders, text)
- **neo-light**: `#FAFAFA` - Background light
- **neo-pink**: `#B22360` - Destructive/Risk actions
- **neo-blue**: `#9FAEF9` - Medium confidence
- **neo-green**: `#4C6F26` - Success/High potential
- **neo-purple**: `#3435CD` - Primary actions

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui base components
│   ├── layout/          # Sidebar, Header
│   ├── StatsCards.tsx
│   ├── Filters.tsx
│   └── CandidateTable.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── ReviewRoom.tsx
│   ├── CandidateDetail.tsx
│   ├── Interns.tsx
│   ├── Analytics.tsx
│   └── Settings.tsx
├── data/
│   └── mockCandidates.ts  # Mock data (20 candidates)
├── types/
│   └── index.ts           # TypeScript interfaces
├── lib/
│   └── utils.ts           # Utility functions
├── App.tsx                # Main app with routing
├── main.tsx               # Entry point
└── index.css              # Global styles + Neo-brutalist utilities
```

## 🔧 Key Components

### Sidebar
- Collapsible/expandable (35% width when open, 80px when collapsed)
- Active route highlighting with Neo-brutalist styling
- Icons for all menu items
- System status indicator at bottom

### Header
- Admin user dropdown with avatar
- System mode badge (Mock/Live)
- Sync button
- Notification bell with count

### Filters Component
- Search by name
- Score filter (High/Medium/Low)
- Role dropdown
- Date range selection
- Status filter
- Confidence band filter
- Clear filters button

### Candidate Table
- Sortable columns
- View and Plan action buttons
- Color-coded badges for scores and confidence
- Responsive design

## 🎭 Mock Data

The application includes 20 diverse candidate profiles with:
- Realistic names and contact information
- Varied skill scores (65-92)
- Different role alignments
- GitHub statistics
- Resume analysis
- Confidence bands (High Potential, Medium, Risk)
- Various statuses (pending, in_review, accepted, rejected)

## 🔌 Backend Integration

Currently using mock data. To connect to a live backend:

1. Update the API endpoint in Settings
2. Replace mock data imports with API calls
3. Use TanStack Query hooks for data fetching:

```typescript
const { data } = useQuery({
  queryKey: ['candidates'],
  queryFn: () => fetch('/api/candidates').then(r => r.json())
});
```

## 📱 Responsive Design

- **Desktop**: Full 35/65 layout
- **Tablet**: Sidebar collapses, 2-column grids become 1-column
- **Mobile**: Full responsive with hamburger menu (future)

## ⚡ Performance

- Lazy loading for routes (can be implemented)
- Memoized filter calculations
- Optimized re-renders with React.memo
- Custom scrollbar styling
- Smooth animations (< 300ms)

## 🎨 Styling Utilities

Custom CSS classes available:

- `.neo-card` - Neo-brutalist card style
- `.neo-card-hover` - Card with hover animation
- `.glass` - Glassmorphism overlay
- `.glass-strong` - Stronger glass effect
- `.custom-scrollbar` - Custom styled scrollbar
- `.shadow-brutal` - Hard shadow effect
- `.badge-high/medium/low` - Confidence badges

## 🧪 Development Tips

1. **Hot Module Replacement**: Instant updates without full page reload
2. **TypeScript**: Full type safety throughout
3. **Tailwind**: Use `cn()` utility for conditional classes
4. **Icons**: Import from `lucide-react`
5. **Charts**: Use Recharts with Neo-brutalist styling

## 📝 Future Enhancements

- [ ] Authentication system
- [ ] Real-time WebSocket updates
- [ ] Dark mode toggle
- [ ] Export to PDF functionality
- [ ] Advanced search with filters
- [ ] Bulk actions for candidates
- [ ] Email integration
- [ ] Calendar integration for interviews
- [ ] Mobile app version

## 🤝 Contributing

This is a hackathon MVP. For production use:
1. Implement proper authentication
2. Add error boundaries
3. Add comprehensive tests
4. Implement proper API error handling
5. Add loading states for all async operations
6. Implement proper form validation

## 📄 License

MIT License - Feel free to use this for your hackathon or production applications!

## 🎉 Credits

- Design System: Neo-brutalism
- UI Components: shadcn/ui
- Icons: Lucide React
- Charts: Recharts
- Built with ❤️ for IATS Hackathon

---

**Made with Vite + React + TypeScript + Tailwind CSS**
