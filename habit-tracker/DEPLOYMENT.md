# Vercel Deployment Guide

## Repository layout
- App root: `habit-tracker/`

## Required Vercel settings
- Framework preset: **Vite**
- Root directory: `habit-tracker`
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Environment variables
- None required.

## First deployment steps
1. Push branch to GitHub.
2. Import repository into Vercel.
3. Set root directory to `habit-tracker`.
4. Confirm build settings above.
5. Deploy.

## Local preflight checklist
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`
4. Verify:
   - creating habits
   - setting intensity
   - weekly calendar colors
   - streak updates
   - badges unlock
   - total score updates
   - data persists after reload
