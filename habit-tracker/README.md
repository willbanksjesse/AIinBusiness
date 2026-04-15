# Habit Tracker (React + Tailwind + Vite)

A browser-only habit tracking app with:

- Daily habits
- Intensity tracking (0-5) per day
- Weekly calendar with green/red indicators
- Streak tracking
- Badges for 7-day, 30-day, and 100-day streaks
- Gamification points per habit and total score
- Browser `localStorage` persistence (no backend)

## Local development

```bash
npm install
npm run dev
```

The dev server is configured for **http://localhost:3000**.

## Build for production

```bash
npm run build
npm run preview
```

## Vercel deployment

1. Push the repository to GitHub.
2. In Vercel, click **Add New Project** and import this repository.
3. Set the root directory to `habit-tracker`.
4. Use default build settings (Vite):
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Deploy.

No environment variables are required.

## Data model (localStorage)

The app stores habits in `localStorage` key:

- `habit-tracker-v1`

Each habit stores:

- `id`: UUID
- `name`: string
- `pointsPerUnit`: number
- `history`: map of `YYYY-MM-DD -> intensity (0-5)`

## Planning document

See [PLAN.md](./PLAN.md) for the reviewed product plan and phase breakdown.

## Deployment runbook

See [DEPLOYMENT.md](./DEPLOYMENT.md) for a Vercel-ready deployment checklist.

