import { Component } from '@angular/core';
import { FoodItem } from '../../interfaces/food-item';
import { GoalService } from '../../services/goal.service';
import { Goal } from '../../interfaces/goal';
import { MealLogService } from '../../services/meal-log.service'; // meal log service is used to persist meal log data in local storage
import { MealService } from '../../services/meal.service'; // meal service is used to log meals to the backend
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
  deletedMessage: string | null = null; // Message to show when a food item is deleted

  goal: Goal = {
    calorieGoal: 0,
    waterGoal: 0,
    proteinPercent: 0,
    carbsPercent: 0,
    fatsPercent: 0,
    //startingWeight: 0,
    //targetWeight: 0
  };

  constructor(
    private goalService: GoalService, // Injecting the goal service to fetch and save goals
    private mealLogService: MealLogService, // Injecting the meal log service to persist meal log data in local storage
    private mealService: MealService // Injecting the meal service to log meals to the backend
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

  // Delete food from meal and DB
  deleteFoodFromMeal(meal: string, index: number) {
    const foodItem = this.mealLogs[meal][index];

    const confirmDelete = confirm(`Are you sure you want to delete ${foodItem.label} from ${meal}?`); // Ask user for confirmation before deleting
    if (!confirmDelete) return; // User cancelled the deletion

    const today = new Date().toISOString().split('T')[0];
  
    // Remove the food item locally
    this.mealLogService.deleteFoodFromMeal(meal, index); // use mealLogService to remove food item from local storage
  
    // Remove the food item from mongoDB
    this.mealService.deleteMealEntry(today, meal, foodItem).subscribe({ // use mealService to remove food item from mongoDB
      next: () => {
        this.deletedMessage = `Deleted ${foodItem.label} from ${meal}.`; // Show message to user
        setTimeout(() => this.deletedMessage = null, 3000); // Clear message after 3 seconds
        console.log(`Deleted ${foodItem.label} from ${meal} in MongoDB.`);
      },
      error: (err) => {
        console.error('Failed to delete food from DB:', err);
      }
    });
  }
  

  clearMeal(meal: string) {
    this.mealLogService.clearMeal(meal);
  }
}
