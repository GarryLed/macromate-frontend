import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalService } from '../../services/goal.service';
import { Goal } from '../../interfaces/goal';
import { MealSummaryService } from '../../services/meal-summary.service';

@Component({
  selector: 'app-macro-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './macro-progress.component.html',
  styleUrls: ['./macro-progress.component.scss']
})
export class MacroProgressComponent {
  //  Macros Inputs (protein, carbs, fats)
  
  goal: Goal = {
    calorieGoal: 0,
    waterGoal: 0,
    proteinPercent: 0,
    carbsPercent: 0,
    fatsPercent: 0,
  };

  proteinConsumed: number= 0; // Default value for testing
  carbsConsumed: number = 0; // Default value for testing
  fatConsumed: number = 0; // Default value for testing
  proteinGoal: number = 0; // Default value for testing
  carbsGoal: number = 0; // Default value for testing
  fatGoal: number = 0; // Default value for testing

   constructor(
      private goalService: GoalService,
      private mealSummaryService: MealSummaryService
    ) {}

    ngOnInit() {
      this.mealSummaryService.loadFromLocalStorage();
    
      this.mealSummaryService.protein$.subscribe(value => this.proteinConsumed = value);
      this.mealSummaryService.carbs$.subscribe(value => this.carbsConsumed = value);
      this.mealSummaryService.fat$.subscribe(value => this.fatConsumed = value);
    
      // Fetch all goals 
      this.goalService.getGoals().subscribe(goalData => {
        if (goalData) {
          this.goal = goalData;
    
          // Calculate the macro goals based on the percentage of the calorie goal
          this.proteinGoal = this.proteinTarget;
          this.carbsGoal = this.carbsTarget;
          this.fatGoal = this.fatsTarget;
        }
      });
    }
    
    // GETTERS for macro targets based on the percentage of the calorie goal
    get proteinTarget(): number {
      return this.roundToOneDecimal(this.gramsFromPercent(this.goal.proteinPercent));
    }
    
    get carbsTarget(): number {
      return this.roundToOneDecimal(this.gramsFromPercent(this.goal.carbsPercent));
    }
    
    get fatsTarget(): number {
      return this.roundToOneDecimal(this.gramsFromPercent(this.goal.fatsPercent, 9));
    }
    

    private gramsFromPercent(percent: number, kcalPerGram = 4): number {
      return Math.round((percent / 100) * this.goal.calorieGoal / kcalPerGram);
    }
    
    // Round results to one decimal place 
    private roundToOneDecimal(value: number): number {
      return Math.round(value * 10) / 10;
    }
    
  // Daily Progress Calculations 
  
 // Daily Protein progress
get proteinProgress(): number {
  return this.roundToOneDecimal(this.calculateProgress(this.proteinConsumed, this.proteinGoal));
}

  get proteinProgressLabel(): string {
    return this.formatProgressLabel(this.proteinConsumed, this.proteinGoal);
  }

  get proteinProgressColor(): string {
    return this.getProgressColor(this.proteinConsumed, this.proteinGoal);
  }

 // Daily Carbs progress
get carbsProgress(): number {
  return this.roundToOneDecimal(this.calculateProgress(this.carbsConsumed, this.carbsGoal));
}

  get carbsProgressLabel(): string {
    return this.formatProgressLabel(this.carbsConsumed, this.carbsGoal);
  }

  get carbsProgressColor(): string {
    return this.getProgressColor(this.carbsConsumed, this.carbsGoal);
  }

 // Daily Fat progress
get fatProgress(): number {
  return this.roundToOneDecimal(this.calculateProgress(this.fatConsumed, this.fatGoal));
}

  get fatProgressLabel(): string {
    return this.formatProgressLabel(this.fatConsumed, this.fatGoal);
  }

  get fatProgressColor(): string {
    return this.getProgressColor(this.fatConsumed, this.fatGoal);
  }

  // Methods to calculate progress, format labels, and get colors

  private calculateProgress(consumed: number, goal: number): number {
    return Math.min((consumed / goal) * 100, 100);
  }

  private formatProgressLabel(consumed: number, goal: number): string {
    return `${consumed} / ${goal} g`;
  }

  private getProgressColor(consumed: number, goal: number): string {
    return consumed > goal ? 'bg-danger' : 'bg-success';
  }
}
