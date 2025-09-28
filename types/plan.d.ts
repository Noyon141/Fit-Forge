export interface Workout {
  id: string; // unique id for workout
  day: string;
  workout: string;
}

export interface WeekPlan {
  id: string; // unique id for week
  week: number;
  workouts: Workout[];
}

export interface FitForgePlan {
  id: string; // plan-level id
  title: string;
  weeks: WeekPlan[];
}
