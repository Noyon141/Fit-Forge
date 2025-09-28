export interface Workout {
  day: string;
  workout: string;
}

export interface WeekPlan {
  week: number;
  workouts: Workout[];
}

export interface FitForgePlan {
  title: string;
  weeks: WeekPlan[];
}
