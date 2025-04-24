import { Component } from '@angular/core';
import { FoodItem } from '../../interfaces/food-item';
import { GoalService } from '../../services/goal.service';
import { Goal } from '../../interfaces/goal';
import { MealLogService } from '../../services/meal-log.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meals.component.html'
})
export class MealsComponent {
  mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  mealLogs: { [mealType: string]: FoodItem[] } = {};

  goal: Goal = {
    calorieGoal: 0,
    waterGoal: 0,
    proteinPercent: 0,
    carbsPercent: 0,
    fatsPercent: 0,
    startingWeight: 0,
    targetWeight: 0
  };

  constructor(
    private goalService: GoalService,
    private mealLogService: MealLogService
  ) {
    // Get goal from backend
    this.goalService.getGoals().subscribe({
      next: (goalData: any) => {
        this.goal = {
          calorieGoal: goalData.calorieGoal,
          waterGoal: goalData.waterGoal,
          proteinPercent: goalData.proteinPercent,
          carbsPercent: goalData.carbsPercent,
          fatsPercent: goalData.fatsPercent,
          //startingWeight: goalData.startingWeight,
          //targetWeight: goalData.targetWeight
        };
      },
      error: (err) => {
        console.error('Failed to load goals:', err);
      }
    });

    // Load local meal logs
    this.mealLogs = this.mealLogService.getMealLog();
  }

  getMealTotal(meal: string, macro: keyof FoodItem): number {
    return this.mealLogs[meal]?.reduce(
      (sum, item) => sum + (typeof item[macro] === 'number' ? item[macro] : 0),
      0
    ) || 0;
  }

  get totalCalories(): number {
    return this.getAllFoods().reduce((sum, item) => sum + item.calories, 0);
  }

  get totalMacros() {
    const all = this.getAllFoods();
    return {
      protein: this.sumMacro(all, 'protein'),
      carbs: this.sumMacro(all, 'carbs'),
      fat: this.sumMacro(all, 'fat')
    };
  }

  get proteinTarget(): number {
    return this.gramsFromPercent(this.goal.proteinPercent);
  }

  get carbsTarget(): number {
    return this.gramsFromPercent(this.goal.carbsPercent);
  }

  get fatsTarget(): number {
    return this.gramsFromPercent(this.goal.fatsPercent, 9); // fats = 9 kcal/g
  }

  private gramsFromPercent(percent: number, kcalPerGram = 4): number {
    return Math.round((percent / 100) * this.goal.calorieGoal / kcalPerGram);
  }

  private getAllFoods(): FoodItem[] {
    return Object.values(this.mealLogs).flat();
  }

  private sumMacro(items: FoodItem[], macro: 'protein' | 'carbs' | 'fat'): number {
    return items.reduce((sum, item) => sum + item[macro], 0);
  }

  deleteFoodFromMeal(meal: string, index: number) {
    this.mealLogService.deleteFoodFromMeal(meal, index);
  }

  clearMeal(meal: string) {
    this.mealLogService.clearMeal(meal);
  }
}
