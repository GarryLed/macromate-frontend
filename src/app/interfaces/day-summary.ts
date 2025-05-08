
// This file defines the structure of a day summary object for daily summaries in the application 
export interface MacroBreakdown {
  protein: number;
  carbs: number;
  fats: number;
}

export interface DaySummary {
  date: string; 
  calories: number;
  macros: MacroBreakdown;
  waterIntake: number; 
  weight: number;      
 
}

