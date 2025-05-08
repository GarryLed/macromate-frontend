import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodItem } from '../../interfaces/food-item';
import { GoalService } from '../../services/goal.service';
import { Goal } from '../../interfaces/goal';
import { MealLogService } from '../../services/meal-log.service';
import { MealService } from '../../services/meal.service';
import { MealSummaryService } from '../../services/meal-summary.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {
  mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  mealLogs: { [mealType: string]: FoodItem[] } = {};
  deletedMessage: string | null = null;
  private mealLogSub!: Subscription; // Subscription to meal log updates

  // goal object to hold the user's goals
  goal: Goal = {
    calorieGoal: 0,
    waterGoal: 0,
    proteinPercent: 0,
    carbsPercent: 0,
    fatsPercent: 0,
  };

  // Constructor to inject services
  constructor(
    private goalService: GoalService,
    private mealLogService: MealLogService,
    private mealService: MealService,
    private mealSummaryService: MealSummaryService
  ) {}

  // Initialize component and load meal logs and goals
  ngOnInit(): void {
    this.subscribeToMealLog();
    this.loadGoals();
  }

  // Subscribe to meal service to get meal logs and update the meal summary
  private subscribeToMealLog(): void {
    this.mealLogSub = this.mealLogService.getMealLog().subscribe(logs => {
      this.mealLogs = logs;
      this.updateMealSummary();
    });
  }

  // Load goals from the goal service and set the goal state
  private loadGoals(): void {
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
      error: (err) => console.error('Failed to load goals:', err)
    });
  }

  // Calculate meal totals for a specific macro (protein, carbs, fat)
  getMealTotal(meal: string, macro: keyof FoodItem): number {
    return this.mealLogs[meal]?.reduce(
      (sum, item) => sum + (typeof item[macro] === 'number' ? item[macro] : 0),
      0
    ) || 0;
  }

  // GETTERS for total calories and macros
  get totalCalories(): number {
    return this.getAllFoods().reduce((sum, item) => sum + item.calories, 0);
  }

  get totalMacros() {
    const allFoods = this.getAllFoods();
    return {
      protein: this.sumMacro(allFoods, 'protein'),
      carbs: this.sumMacro(allFoods, 'carbs'),
      fat: this.sumMacro(allFoods, 'fat')
    };
  }

  // GETTERS for target macros based on goal percentages
  get proteinTarget(): number {
    return this.gramsFromPercent(this.goal.proteinPercent);
  }

  get carbsTarget(): number {
    return this.gramsFromPercent(this.goal.carbsPercent);
  }

  get fatsTarget(): number {
    return this.gramsFromPercent(this.goal.fatsPercent, 9);
  }


  // Helper fuction to get grams from percentage of calorie goal
  private gramsFromPercent(percent: number, kcalPerGram = 4): number {
    return Math.round((percent / 100) * this.goal.calorieGoal / kcalPerGram);
  }

  private getAllFoods(): FoodItem[] {
    return Object.values(this.mealLogs).flat();
  }

  // Helper function to sum macros for all food items
  private sumMacro(items: FoodItem[], macro: 'protein' | 'carbs' | 'fat'): number {
    return items.reduce((sum, item) => sum + item[macro], 0);
  }

  // Update the meal summary in the service
  private updateMealSummary(): void {
    const allFoods = this.getAllFoods();
    const totalCalories = allFoods.reduce((sum, item) => sum + item.calories, 0);
    const totalProtein = this.sumMacro(allFoods, 'protein');
    const totalCarbs = this.sumMacro(allFoods, 'carbs');
    const totalFat = this.sumMacro(allFoods, 'fat');

    this.mealSummaryService.updateSummary(totalCalories, totalProtein, totalCarbs, totalFat);
  }

  // Delete a food item from a specific meal
  deleteFoodFromMeal(meal: string, index: number): void {
    const foodItem = this.mealLogs[meal][index];

    // ask user for confirmation before deleting
    if (!confirm(`Are you sure you want to delete "${foodItem.label}" from ${meal}?`)) {
      return;
    }

    // Check if foodItem has a valid MongoDB _id
    // If not, log a warning and return
    if (!foodItem._id) {
      console.warn(`Cannot delete "${foodItem.label}" — no MongoDB _id found.`);
      return;
    }

    // Call the meal service to delete the food item from the database
    // and then update the meal log in the service
    this.mealService.deleteMealEntryById(foodItem._id).subscribe({
      next: () => {
        console.log(`Deleted from DB: ${foodItem._id}`); // confirm deletion in the console
        this.mealLogService.deleteFoodFromMeal(meal, index);

        this.deletedMessage = `Deleted ${foodItem.label} from ${meal}.`; // Show a message to the user
        setTimeout(() => (this.deletedMessage = null), 3000);
      },
      error: (err) => {
        console.error('Failed to delete from DB:', err);
      }
    });
  }

  // Clear all meals from the meal log
  clearAllMeals(): void {
    if (!confirm('Are you sure you want to clear all meals for today?')) return;

    this.mealLogService.clearAllMeals(); // Will trigger observable update automatically
  }

  // Cleans up the subscription to avoid memory leaks
  ngOnDestroy(): void {
    this.mealLogSub?.unsubscribe(); 
  }
}
