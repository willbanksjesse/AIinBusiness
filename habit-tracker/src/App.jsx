import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'habit-tracker-v1';
const BADGE_MILESTONES = [7, 30, 100];

const formatDate = (date) => date.toISOString().split('T')[0];

const startOfWeek = (date) => {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = (day + 6) % 7;
  copy.setDate(copy.getDate() - diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const getWeekDates = (date) => {
  const start = startOfWeek(date);
  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(start);
    current.setDate(start.getDate() + index);
    return current;
  });
};

const calculateStreak = (history) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;

  for (let i = 0; i < 3650; i += 1) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const key = formatDate(checkDate);

    if ((history?.[key] ?? 0) > 0) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
};

const emptyForm = {
  name: '',
  pointsPerUnit: 10,
};

function App() {
  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const todayKey = formatDate(new Date());
  const weekDates = useMemo(() => getWeekDates(new Date()), []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setHabits(parsed);
      }
    } catch {
      // Invalid local storage state; ignore and start fresh.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const addHabit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    const newHabit = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      pointsPerUnit: Number(form.pointsPerUnit) || 1,
      history: {},
    };

    setHabits((prev) => [newHabit, ...prev]);
    setForm(emptyForm);
  };

  const removeHabit = (id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const updateTodayIntensity = (id, intensity) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) {
          return habit;
        }

        return {
          ...habit,
          history: {
            ...habit.history,
            [todayKey]: Number(intensity),
          },
        };
      }),
    );
  };

  const totalScore = habits.reduce((sum, habit) => {
    const habitScore = Object.values(habit.history || {}).reduce(
      (innerSum, value) => innerSum + Number(value || 0) * Number(habit.pointsPerUnit || 0),
      0,
    );

    return sum + habitScore;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <h1 className="text-3xl font-bold tracking-tight">Habit Tracker</h1>
          <p className="text-slate-300">
            Track daily intensity (1-5), build streaks, earn badges, and gamify your progress. Data is saved in browser local storage.
          </p>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-semibold text-emerald-300">
            Total Score: {totalScore} pts
          </div>
        </header>

        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold">Add a Habit</h2>
          <form onSubmit={addHabit} className="grid gap-4 md:grid-cols-[2fr_1fr_auto]">
            <input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Habit name (e.g., Drink water)"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-emerald-500 transition focus:ring"
            />
            <input
              type="number"
              min={1}
              max={100}
              value={form.pointsPerUnit}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  pointsPerUnit: Math.min(100, Math.max(1, Number(event.target.value || 1))),
                }))
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-emerald-500 transition focus:ring"
              title="Points earned for each intensity level"
            />
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Add Habit
            </button>
          </form>
        </section>

        <section className="space-y-4">
          {habits.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 p-8 text-center text-slate-400">
              No habits yet. Add your first habit above.
            </div>
          )}

          {habits.map((habit) => {
            const streak = calculateStreak(habit.history);
            const todayIntensity = habit.history?.[todayKey] ?? 0;
            const earnedBadges = BADGE_MILESTONES.filter((milestone) => streak >= milestone);
            const weeklyPoints = weekDates.reduce((sum, date) => {
              const key = formatDate(date);
              return sum + Number(habit.history?.[key] ?? 0) * Number(habit.pointsPerUnit || 0);
            }, 0);

            return (
              <article
                key={habit.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{habit.name}</h3>
                    <p className="text-sm text-slate-300">
                      Current streak: <span className="font-semibold text-emerald-300">{streak}</span> day(s) · {habit.pointsPerUnit} pts/intensity · Weekly points: {weeklyPoints}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeHabit(habit.id)}
                    className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1 text-sm text-red-300 transition hover:bg-red-500/20"
                  >
                    Remove
                  </button>
                </div>

                <div className="mb-5 rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                  <label className="mb-2 block text-sm text-slate-300">Today's intensity (1-5)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={5}
                      step={1}
                      value={todayIntensity}
                      onChange={(event) => updateTodayIntensity(habit.id, event.target.value)}
                      className="w-full accent-emerald-500"
                    />
                    <span className="min-w-20 rounded-lg border border-slate-700 px-2 py-1 text-center font-semibold text-emerald-300">
                      {todayIntensity === 0 ? 'Skipped' : `Lv ${todayIntensity}`}
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="mb-2 text-sm text-slate-300">Weekly calendar</p>
                  <div className="grid grid-cols-7 gap-2">
                    {weekDates.map((date) => {
                      const key = formatDate(date);
                      const intensity = Number(habit.history?.[key] ?? 0);
                      const isToday = key === todayKey;

                      return (
                        <div
                          key={key}
                          className={`rounded-xl border p-2 text-center text-xs ${
                            intensity > 0
                              ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                              : 'border-red-500/30 bg-red-500/10 text-red-300'
                          } ${isToday ? 'ring-2 ring-slate-300/30' : ''}`}
                        >
                          <div className="font-semibold">
                            {date.toLocaleDateString(undefined, { weekday: 'short' })}
                          </div>
                          <div>{date.getDate()}</div>
                          <div>{intensity > 0 ? `Lv ${intensity}` : 'No'}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm text-slate-300">Badges</p>
                  <div className="flex flex-wrap gap-2">
                    {BADGE_MILESTONES.map((milestone) => {
                      const unlocked = earnedBadges.includes(milestone);
                      return (
                        <span
                          key={milestone}
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            unlocked
                              ? 'bg-amber-400/20 text-amber-300 ring-1 ring-amber-400/40'
                              : 'bg-slate-800 text-slate-400 ring-1 ring-slate-700'
                          }`}
                        >
                          {milestone}-day badge {unlocked ? '🏆' : '🔒'}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default App;
