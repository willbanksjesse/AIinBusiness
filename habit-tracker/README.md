# Habit Tracker

A simple web app to track daily habits with binary completion, weekly calendar view, and streak tracking. Built with React and Tailwind CSS. All data is stored locally in the browser.

## Features

- Add daily habits
- Intensity tracking (1-5 scale or skip) for each day
- Weekly calendar with color-coded indicators (red for skip, green shades for intensity)
- Streak tracking for consecutive days with intensity > 0
- Badges for 7-day, 30-day, and 100-day streaks
- Gamification: points per habit (sum of intensities), total score display
- Edit and delete habits
- Statistics dashboard (total habits, completions, average streak)
- Dark mode toggle
- Export data to JSON
- Colorful UI with gradients and themes
- Local storage persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/willbanksjesse/AIinBusiness.git
   cd AIinBusiness/habit-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

This creates a `build` folder with the optimized production build.

## Deployment to Vercel

1. Push your code to GitHub.

2. Go to [Vercel](https://vercel.com) and sign in.

3. Click "New Project" and import your repository.

4. Configure the project:
   - **Framework Preset:** React
   - **Root Directory:** habit-tracker (if deploying from subfolder)
   - **Build Command:** `npm run build`
   - **Output Directory:** build

5. Deploy!

The app will be live at your Vercel URL. Since it's a static React app with no backend, it deploys seamlessly.

## Usage

- Add a new habit using the form at the top.
- For each habit, select intensity level (1-5) or "Skip" for today.
- View your weekly progress in the color-coded calendar below each habit (darker green = higher intensity).
- Streaks are calculated for consecutive days with intensity > 0.
- Earn badges for long streaks.
- Track your total score from all habit intensities.
- Edit or delete habits using the buttons.
- View statistics in the dashboard.
- Toggle dark mode for a different theme.
- Export your data as JSON for backup.

## Technologies Used

- React
- Tailwind CSS
- Local Storage API

## Future Enhancements

- More gamification features
- Habit categories
- Export/import data