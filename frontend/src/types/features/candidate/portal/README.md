# Candidate Application Portal - Implementation Guide

## 📋 Overview

A production-ready candidate application portal integrated into the existing IATS admin dashboard. This feature allows candidates to apply for internship positions through a comprehensive, multi-section form with real-time validation and AI-assisted evaluation.

## 🏗️ Architecture

### Route Structure
- **Public Route**: `/apply` - No admin layout, publicly accessible
- **Admin Routes**: All existing routes remain unchanged

### Feature Location
```
src/
  features/
    candidate/
      portal/
        ├── CandidatePortalPage.tsx       # Main page component
        ├── constants.ts                   # Role options and config
        ├── types.ts                       # TypeScript interfaces
        ├── components/
        │   ├── HeroSection.tsx            # Landing section
        │   ├── RoleSelector.tsx           # Role selection cards
        │   ├── ApplicationForm.tsx        # Main form wrapper
        │   ├── PersonalSection.tsx        # Personal info
        │   ├── ProfessionalSection.tsx    # GitHub, tech stack
        │   ├── EducationSection.tsx       # Education details
        │   ├── ExperienceSection.tsx      # Projects & experience
        │   ├── MotivationSection.tsx      # Motivation essays
        │   ├── ResumeUpload.tsx           # File upload with drag-drop
        │   └── PreviewSection.tsx         # Final review & confirmation
        ├── hooks/
        │   ├── useApplicationForm.ts      # Form state management
        │   └── useDebounce.ts             # Debounce utility
        ├── schemas/
        │   └── applicationSchema.ts       # Zod validation schemas
        └── services/
            ├── githubValidation.ts        # GitHub profile validation
            └── submitApplication.ts       # Submission logic
```

## 🚀 Installation

### 1. Install Dependencies
```bash
npm install
```

The following new packages have been added to `package.json`:
- `react-hook-form@^7.50.1` - Form state management
- `zod@^3.22.4` - Schema validation
- `@hookform/resolvers@^3.3.4` - Zod resolver for React Hook Form
- `uuid@^9.0.1` - UUID generation
- `axios@^1.6.5` - HTTP client (for future API integration)
- `@types/uuid@^9.0.7` - TypeScript types for UUID

### 2. Verify File Structure
Ensure all files from the feature folder are in place:
```bash
tree src/features/candidate/portal
```

### 3. Run the Application
```bash
npm run dev
```

### 4. Access the Portal
Navigate to: `http://localhost:5173/apply`

## 🎯 Key Features

### 1. **Hero Section**
- Company branding
- Program description
- "AI-Assisted Evaluation" badge
- Call-to-action button

### 2. **Role Selection**
- 6 role options (Backend, Frontend, Full Stack, DevOps, Data, Mobile)
- Interactive cards with:
  - Role description
  - Key requirements
  - Duration & commitment details
  - Selection state with visual feedback

### 3. **Multi-Section Form**

#### A. Personal Information
- Full Name
- Email (with format validation)
- Phone (with pattern validation)
- Age (minimum 18)
- Location
- Availability (hours/day)

#### B. Professional Profile
- GitHub URL (with real-time validation)
  - Async validation with debouncing
  - Profile existence check
  - Repository verification
  - Visual feedback (Valid/Not Found/No Repos)
- LinkedIn URL (optional)
- Portfolio URL (optional)
- Tech Stack (multi-select, 1-10 items)
- Years of Experience
- Current Status (Student/Graduate/Professional)

#### C. Education
- Degree Level (dropdown)
- Field of Study
- Institution Name
- Graduation Year
- GPA (optional)

#### D. Experience & Projects
- Previous Internship (Yes/No toggle)
- Company & Duration (conditional)
- Project Links (minimum 2, maximum 5)
  - URL validation
  - Description (10-300 characters)
  - Dynamic add/remove

#### E. Motivation
- Why applying (50-1000 characters)
- Areas to improve (50-1000 characters)
- Character counter with validation

#### F. Resume Upload
- Drag & drop or click to upload
- PDF only
- Maximum 5MB
- File validation
- Visual upload feedback
- File removal option

### 4. **Preview Section**
- Summary of all entered data
- Grouped by section
- Terms & conditions checkbox
- Submission confirmation

### 5. **Success Screen**
- Confirmation message
- Application ID display
- Next steps information
- Email notification details

## 🔒 Validation & Security

### Form Validation (Zod)
- All fields validated according to business rules
- Real-time feedback on errors
- Type-safe schema definitions
- Custom error messages

### GitHub Validation
- Debounced async validation (800ms)
- URL format check
- Profile existence verification
- Repository check
- Mock implementation (ready for API integration)

### File Upload Security
- Type validation (PDF only)
- Size validation (5MB max)
- Client-side checks before submission

### Input Sanitization
- Text trimming
- Email normalization (lowercase)
- URL normalization
- Character limits enforced

### Submission Protection
- Disabled submit during processing
- Prevents double submission
- Error handling with user feedback
- Rate limiting ready

## 📊 Data Flow

### Submission Pipeline
```
Form Data → Validation → Transform → Submit → Success/Error
```

### Payload Structure
```typescript
{
  id: "uuid-v4",
  role_selected: "backend",
  personal: { /* PersonalInfo */ },
  professional: { /* ProfessionalProfile */ },
  education: { /* Education */ },
  experience: { /* Experience */ },
  motivation: { /* Motivation */ },
  resume_filename: "resume.pdf",
  meta: {
    submitted_at: "2024-02-19T10:30:00Z",
    source: "candidate_portal_v1"
  },
  status: "pending"
}
```

## 🎨 Design System Compliance

### Colors
- Uses existing color palette (charcoal, cream, sky, lime, orange)
- Consistent with admin dashboard theme
- No new color additions

### Typography
- Serif font (Playfair Display) for headings
- Sans font (Inter) for body text
- Consistent scale with admin UI

### Components
- All shadcn/ui components
- Same card styling (flat-card)
- Consistent spacing (Tailwind scale)
- Matching border radius and shadows

### Layout
- Centered container (max-w-7xl)
- Responsive grid system
- Proper spacing between sections
- Mobile-friendly design

## 🔧 Configuration

### Role Options
Edit `src/features/candidate/portal/constants.ts`:
```typescript
export const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'backend',
    title: 'Backend Developer',
    description: '...',
    requirements: ['...'],
    duration: '3-6 months',
    commitment: '20-30 hours/week',
    location: 'Remote / Hybrid',
  },
  // Add or modify roles here
];
```

### Company Information
```typescript
export const COMPANY_INFO = {
  name: 'XYZ Technologies',
  tagline: '...',
  program: {
    name: '...',
    description: '...',
  },
};
```

### Validation Rules
Modify `src/features/candidate/portal/schemas/applicationSchema.ts` to adjust:
- Field requirements
- Character limits
- Age restrictions
- File size limits
- Tech stack options

## 🔌 API Integration

### Current Implementation (Mock)
The application currently uses mock services. All submission logic is in place but makes console logs instead of API calls.

### Production Migration Steps

#### 1. Update Submit Service
File: `src/features/candidate/portal/services/submitApplication.ts`

Replace:
```typescript
console.log('📤 Application Submission:', payload);
// Mock implementation
```

With:
```typescript
const response = await axios.post('/api/applications', payload, {
  headers: {
    'Content-Type': 'application/json',
  },
});
return response.data;
```

#### 2. Update GitHub Validation
File: `src/features/candidate/portal/services/githubValidation.ts`

Replace:
```typescript
// Mock validation logic
```

With:
```typescript
const response = await axios.get(`/api/validate-github/${username}`);
return response.data;
```

#### 3. Add Resume Upload
Implement actual file upload:
```typescript
const formData = new FormData();
formData.append('resume', file);
const response = await axios.post('/api/upload-resume', formData);
```

#### 4. Configure API Base URL
Create `.env`:
```
VITE_API_BASE_URL=https://your-api.com
```

Update axios:
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
```

## 📈 Future Enhancements

### Suggested Improvements
1. **Multi-step Progress Indicator** - Show completion percentage
2. **Auto-save** - Save form progress to localStorage
3. **Email Verification** - Send verification code to email
4. **Captcha Integration** - Prevent bot submissions
5. **Application Tracking** - Allow candidates to check status
6. **Draft Applications** - Save and return later
7. **LinkedIn Integration** - Auto-fill from LinkedIn
8. **GitHub Stats Display** - Show real-time GitHub metrics

### Analytics Integration
Add tracking for:
- Form abandonment rates
- Section completion times
- Error field tracking
- Submission success rates

## 🧪 Testing

### Manual Testing Checklist
- [ ] All form fields validate correctly
- [ ] GitHub validation works with debouncing
- [ ] File upload validates type and size
- [ ] Dynamic project links work (add/remove)
- [ ] Form submission prevents double-submit
- [ ] Success screen displays correctly
- [ ] Error messages are clear and helpful
- [ ] Mobile responsive design works
- [ ] Keyboard navigation functions
- [ ] Screen reader accessibility

### Test Data
Use these test GitHub usernames for validation:
- Valid: `priyasharma`, `arjunpatel`, `octocat`
- No Repos: `newuser`, `emptyprofile`
- Not Found: Any other username (30% chance of random success)

## 🐛 Troubleshooting

### Common Issues

**Issue**: Form not submitting
- Check console for validation errors
- Ensure all required fields are filled
- Verify terms checkbox is checked

**Issue**: GitHub validation not working
- Check network tab for API calls
- Verify debounce is working (800ms delay)
- Ensure URL format is correct

**Issue**: File upload fails
- Verify file is PDF
- Check file size (<5MB)
- Clear browser cache

**Issue**: Styling doesn't match admin
- Ensure Tailwind config is unchanged
- Check that custom CSS classes are available
- Verify theme tokens are correct

## 📝 Notes

- No modifications were made to existing admin features
- All new code is isolated in the `features/candidate/portal` directory
- Routing keeps admin and public sections separate
- Ready for production deployment after API integration
- Fully type-safe with TypeScript strict mode
- Follows existing codebase patterns and conventions

## 🤝 Contributing

When adding new sections or modifying the form:

1. Update TypeScript interfaces in `types.ts`
2. Add Zod validation in `schemas/applicationSchema.ts`
3. Create new component in `components/` folder
4. Update `ApplicationForm.tsx` to include new section
5. Modify submission payload structure if needed
6. Update this README with changes

## 📞 Support

For questions or issues:
1. Check this documentation first
2. Review console logs for errors
3. Verify all dependencies are installed
4. Check that file structure matches specification
5. Ensure no conflicts with existing admin code

---

**Version**: 1.0.0  
**Last Updated**: February 2024  
**Status**: Production Ready (with mock API)
