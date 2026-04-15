# Habit Tracker Plan (Reviewed)

## Goal
Build a browser-only habit tracking web app with React + Tailwind CSS and no backend.

## Phase 1 (Base Product)
1. Habit management
   - Add/remove daily habits.
2. Binary tracking (did / didn't)
   - Mark completion per day.
3. Weekly calendar
   - Show 7-day view with green/red indicators.
4. Streak tracking
   - Calculate current consecutive completion streak.
5. Local persistence
   - Save/read app state via `localStorage`.

## Phase 2 (Requested Follow-Up Challenges)
1. Streak badges
   - Unlock badges at 7, 30, and 100 days.
2. Intensity tracking (1-5) replacing binary mode
   - Use 0 as "skipped", 1-5 as completion intensity.
3. Gamification
   - Points per habit and aggregate total score.

## Delivery + Deploy Readiness
- Keep project fully client-side (no backend/API).
- Configure local dev server on port 3000.
- Provide Vercel deployment documentation and project root guidance.
