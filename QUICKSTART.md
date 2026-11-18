# Quick Start Guide

Get the Cynbit Careers Explorer running in under 5 minutes.

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

That's it! You should see the careers page with all 20 roles.

## What to Try

### 🔍 Search
- Type "developer" or "marketing" in the search bar
- Try typos like "devloper" — fuzzy search handles it!

### 🎯 Filters
- Check "Internship" under Type
- Select "Tech" under Department
- Notice the URL updates with `?type=Internship&dept=Tech`

### 💾 Save Roles
- Click the bookmark icon on any role card
- Your saved roles persist even after refresh

### 🎮 Role Matcher
- Click "Find Your Match" in the header
- Answer 5 quick questions
- See your top 3 matching roles with scores

### 📝 Apply
- Open any role → Click "Apply for this role"
- Fill out the form (all fields validated)
- Submit and see the confirmation page

## Building for Production

```bash
npm run build
npm start
```

## Deploying to Vercel

The easiest way:

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click "Deploy"

Done! Your site will be live at `your-project.vercel.app`

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors?**
Make sure you're using Node.js 18+ and have the latest TypeScript:
```bash
node --version
npm install -D typescript@latest
```

## Next Steps

- Read the full [README.md](./README.md) for architecture details
- Check out [docs/REPORT.md](./docs/REPORT.md) for the technical deep-dive
- Customize roles in `data/roles.ts`
- Add your own branding in `app/layout.tsx`

## Need Help?

- **Documentation**: See README.md
- **Report Issues**: Open a GitHub issue
- **Contact**: careers@cynbit.in

---

Happy coding! 🚀
