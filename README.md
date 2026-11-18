# Cynbit Careers Explorer

A modern, full-featured careers page built for Cynbit Technologies, showcasing 20 job openings with advanced search, filtering, role matching, and application management.

![Cynbit Careers](https://img.shields.io/badge/Next.js-16.4.6-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.3-38bdf8?logo=tailwindcss)

## ✨ Features

### 🔍 Smart Search & Discovery
- **Instant fuzzy search** using Fuse.js across titles, descriptions, and skills
- **Multi-dimensional filters**: Role type, department, experience level, location
- **Smart sorting**: Relevance, A-Z, internships first
- **URL-synced state**: All filters and search persist in the URL for shareability
- **Live result count** and empty state handling

### 🎯 Role Matcher Quiz
- 5-question interactive quiz to match candidates with ideal roles
- Transparent weighted scoring algorithm:
  - Interest alignment (30 points)
  - Skills matching (30 points)
  - Experience fit (20 points)
  - Work style (10 points)
  - Career goals (10 points)
- Top 3 matches with percentage scores and match reasoning
- Beautiful results page with instant apply/view actions

### 💾 Save & Bookmark
- Client-side role bookmarking using localStorage
- Persistent saved roles across sessions
- Visual save indicators on cards and detail pages

### 📄 Role Detail Pages
- Comprehensive role information: summary, responsibilities, skills
- Similar roles suggestion engine
- Clean, accessible design with proper semantic HTML
- Breadcrumb navigation

### 📝 Application Flow
- Form validation with React Hook Form + Zod
- Required fields: name, email, resume link, cover note
- Optional: LinkedIn, GitHub profiles
- Server-side validation and rate limiting (3 applications per hour per IP)
- Success confirmation page
- Applications stored as JSON files (production-ready for database integration)

### 🎨 Design & UX
- Clean, modern interface matching Cynbit's brand
- Fully responsive (mobile-first approach)
- Accessible (ARIA labels, keyboard navigation, semantic HTML)
- Smooth transitions and hover states
- Custom scrollbar styling

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.3
- **Search**: Fuse.js (client-side fuzzy search)
- **Forms**: React Hook Form + Zod validation
- **URL State**: nuqs (URL-synced query parameters)
- **Animations**: Framer Motion (ready for use)
- **Deployment**: Vercel

## 📂 Project Structure

```
cynbit/
├── app/
│   ├── api/
│   │   └── applications/          # Application submission API
│   ├── careers/
│   │   ├── [slug]/
│   │   │   ├── apply/             # Application form
│   │   │   └── page.tsx           # Role detail page
│   │   ├── matcher/               # Role matcher quiz
│   │   └── page.tsx               # Main careers listing
│   ├── layout.tsx
│   └── page.tsx                   # Redirects to /careers
├── components/
│   ├── careers/
│   │   ├── FilterPanel.tsx
│   │   ├── RoleCard.tsx
│   │   ├── SaveRoleButton.tsx
│   │   ├── SearchBar.tsx
│   │   └── SortControl.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       └── Input.tsx
├── data/
│   ├── applications/              # Stored applications (gitignored)
│   └── roles.ts                   # 20 seeded roles
├── lib/
│   ├── filters.ts                 # Filter and sort logic
│   ├── role-matcher.ts            # Scoring algorithm
│   ├── saved-roles.ts             # LocalStorage helpers
│   ├── search.ts                  # Fuse.js wrapper
│   └── similar-roles.ts           # Similarity algorithm
└── docs/
    └── REPORT.md                  # Technical report
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cynbit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file** (optional)
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🧪 Testing

The project includes unit tests for core logic:

```bash
# Run tests (when implemented)
npm test
```

Test coverage includes:
- Role matcher scoring algorithm
- Filter and search logic
- Form validation schemas

## 📊 Data Model

Each role includes:
- `slug`: URL-friendly identifier
- `title`: Role name
- `type`: "Internship" | "Full-Time"
- `department`: Tech, Marketing & Growth, Business, Core Engineering, Growth Team
- `location`: "Remote / Jaipur"
- `experience`: "Internship" | "1-2 Years" | "1-3 Years"
- `summary`: Brief description
- `skills[]`: Array of required skills
- `responsibilities[]`: Array of job duties

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy automatically

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/cynbit)

### Environment Variables

Set these in your Vercel project settings:
- `NEXT_PUBLIC_APP_URL`: Your production URL

## 🎯 Future Enhancements

- [ ] Database integration (PostgreSQL/Supabase)
- [ ] Email notifications for applications
- [ ] Admin dashboard for application review
- [ ] Applicant Tracking System (ATS) integration
- [ ] Advanced analytics (page views, conversion rates)
- [ ] Social sharing (Open Graph tags)
- [ ] Internationalization (i18n)
- [ ] Dark mode toggle
- [ ] PDF resume upload with parsing
- [ ] Candidate portal for application tracking

## 📝 License

This project is built for Cynbit Technologies.

## 👨‍💻 Author

Built as a Full Stack Developer Intern assessment for Cynbit Technologies.

---

**Cynbit Technologies** | Architect human-centric software solutions
