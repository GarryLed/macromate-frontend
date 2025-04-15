import { Injectable } from '@angular/core';

export interface Goal {
  calories: number;
  proteinPercent: number;
  carbsPercent: number;
  fatsPercent: number;
  waterTarget: number;
}

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private goal: Goal = {
    calories: 2000,
    proteinPercent: 40,
    carbsPercent: 40,
    fatsPercent: 20,
    waterTarget: 3000
  };

  getGoal(): Goal {
    return this.goal;
  }

  updateGoal(updated: Goal): void {
    this.goal = { ...updated };
  }
}

