import { Component } from '@angular/core';
import { FoodItem } from '../../interfaces/food-item';
import { GoalService, Goal } from '../../services/goal.service';
import { MealLogService } from '../../services/meal-log.service';
import { MealLog } from '../../interfaces/meal-log';

@Component({
  selector: 'app-meals',
  standalone: true,
  templateUrl: './meals.component.html'
})
export class MealsComponent {
  mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  mealLogs: { [mealType: string]: FoodItem[] } = { /* add mock data */ };

  goal: Goal;
 

  constructor(private goalService: GoalService, private mealLogService: MealLogService) {
    this.goal = this.goalService.getGoal();
    this.mealLogs = this.mealLogService.getMealLog();
  }

  // Helper to get total per meal per macro type
  getMealTotal(meal: string, macro: keyof FoodItem): number {
    return this.mealLogs[meal]?.reduce((sum, item) => sum + (typeof item[macro] === 'number' ? item[macro] : 0), 0) || 0;
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

  // Calculate daily macro targets (g) based on % of calories
  get proteinTarget(): number {
    return this.gramsFromPercent(this.goal.proteinPercent);
  }

  get carbsTarget(): number {
    return this.gramsFromPercent(this.goal.carbsPercent);
  }

  get fatsTarget(): number {
    return this.gramsFromPercent(this.goal.fatsPercent, 9); // fat = 9 kcal/g
  }

  // Helpers
  private gramsFromPercent(percent: number, kcalPerGram = 4): number {
    return Math.round((percent / 100) * this.goal.calories / kcalPerGram);
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

