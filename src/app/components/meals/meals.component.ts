import { Component } from '@angular/core';
import { FoodItem } from '../../interfaces/food-item';
import { GoalService, Goal } from '../../services/goal.service';
import { MealLogService } from '../../services/meal-log.service';
import { MealLog } from '../../interfaces/meal-log';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meals.component.html'
})
export class MealsComponent {
  mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  mealLogs: { [mealType: string]: FoodItem[] } = { /* add mock data */ };

  goal: Goal;
 

  // constructor to inject the goal and meal log services
  // and initialize the goal and meal logs
  constructor(private goalService: GoalService, private mealLogService: MealLogService) {
    this.goal = this.goalService.getGoal();
    this.mealLogs = this.mealLogService.getMealLog();
  }

  /*
  // Helper to get total macros for a specific meal
  // This function takes a meal type (e.g., 'Breakfast') and a macro type (e.g., 'protein')
  // and returns the total amount of that macro for the specified meal.
  // It uses the mealLogs object to find the corresponding meal and sums up the macro values of all food items in that meal.


  */
  getMealTotal(meal: string, macro: keyof FoodItem): number {
    return this.mealLogs[meal]?.reduce((sum, item) => sum + (typeof item[macro] === 'number' ? item[macro] : 0), 0) || 0;
  }


  // Getter methods 
  // get the total calories 
  get totalCalories(): number {
    return this.getAllFoods().reduce((sum, item) => sum + item.calories, 0);
  }

  // get the total macros for all meals
  get totalMacros() {
    const all = this.getAllFoods();
    return {
      protein: this.sumMacro(all, 'protein'),
      carbs: this.sumMacro(all, 'carbs'),
      fat: this.sumMacro(all, 'fat')
    };
  }

  // get protein, carbs, and fats targets based on the goal
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
  // calculate the grams from the percentage of protein, carbs and fats consumed 
  // based on the total calories and the kcal per gram (default is 4 kcal/g) which is the standard for protein and carbs
  // for the fats, I used 9 kcal/g (because fat has more calories per gram)

  private gramsFromPercent(percent: number, kcalPerGram = 4): number {
    return Math.round((percent / 100) * this.goal.calories / kcalPerGram);
  }

  // get all food items from all meals
  private getAllFoods(): FoodItem[] {
    return Object.values(this.mealLogs).flat();
  }

  // sum the macros for all food items in a meal
  private sumMacro(items: FoodItem[], macro: 'protein' | 'carbs' | 'fat'): number {
    return items.reduce((sum, item) => sum + item[macro], 0);
  }

  // delete a food item from a specific meal
  deleteFoodFromMeal(meal: string, index: number) {
    this.mealLogService.deleteFoodFromMeal(meal, index);
  }

  // clear entire meal log for a specific meal
  clearMeal(meal: string) {
    this.mealLogService.clearMeal(meal); 
  } 
}

