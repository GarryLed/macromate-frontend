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
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
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

  /*
  // Delete food from meal and DB
  deleteFoodFromMeal(meal: string, index: number) {
    const foodItem = this.mealLogs[meal][index]; // get the food item to be deleted
  
    const confirmDelete = confirm(`Are you sure you want to delete "${foodItem.label}" from ${meal}?`);
    if (!confirmDelete) return;
  
    // delete food item from DB (if _id exists)
    if (foodItem._id) {
      this.mealService.deleteMealEntryById(foodItem._id).subscribe({
        next: () => {
          console.log(`Deleted ${foodItem.label} from MongoDB`);
  
          // here we delete the food item locally once we get confirmation from the DB
          this.mealLogService.deleteFoodFromMeal(meal, index);
          this.deletedMessage = `Deleted ${foodItem.label} from ${meal}.`;
          setTimeout(() => (this.deletedMessage = null), 3000);
        },
        error: (err) => {
          console.error('Failed to delete from DB:', err);
        }
      });
    } else {
      // If no _id exists, delete it directly from local storage
      this.mealLogService.deleteFoodFromMeal(meal, index);
      this.deletedMessage = `Deleted ${foodItem.label} from ${meal} (local only).`;
      setTimeout(() => (this.deletedMessage = null), 3000);
    }
  
  
    
    
  }
  */

  deleteFoodFromMeal(meal: string, index: number): void {
    const foodItem = this.mealLogs[meal][index];
  
    const confirmDelete = confirm(`Are you sure you want to delete "${foodItem.label}" from ${meal}?`);
    if (!confirmDelete) return;
  
    // _id-based deletion only
    if (!foodItem._id) {
      console.warn(`Cannot delete "${foodItem.label}" — no MongoDB _id found.`);
      return;
    }
  
    // Backend deletion by id 
    this.mealService.deleteMealEntryById(foodItem._id).subscribe({
      next: () => {
        console.log(`Deleted from DB: ${foodItem._id}`);
  
        // Remove the food item from local storage after the DB deletion
        this.mealLogService.deleteFoodFromMeal(meal, index);
        this.deletedMessage = `Deleted ${foodItem.label} from ${meal}.`;
  
        setTimeout(() => (this.deletedMessage = null), 3000);
      },
      error: (err) => {
        console.error('Failed to delete from DB:', err);
      }
    });
  }
  
  

  clearMeal(meal: string) {
    this.mealLogService.clearMeal(meal);
  }
}
