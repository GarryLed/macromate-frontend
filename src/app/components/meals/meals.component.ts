import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodItem } from '../../interfaces/food-item';
import { GoalService } from '../../services/goal.service';
import { Goal } from '../../interfaces/goal';
import { MealLogService } from '../../services/meal-log.service';
import { MealService } from '../../services/meal.service';
import { MealSummaryService } from '../../services/meal-summary.service';

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
 

  goal: Goal = {
    calorieGoal: 0,
    waterGoal: 0,
    proteinPercent: 0,
    carbsPercent: 0,
    fatsPercent: 0,
  };

  constructor(
    private goalService: GoalService,
    private mealLogService: MealLogService,
    private mealService: MealService,
    private mealSummaryService: MealSummaryService
  ) {}

  // Macros Calculation 

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
    const allFoods = this.getAllFoods();
    return {
      protein: this.sumMacro(allFoods, 'protein'),
      carbs: this.sumMacro(allFoods, 'carbs'),
      fat: this.sumMacro(allFoods, 'fat')
    };
  }

  get proteinTarget(): number {
    return this.gramsFromPercent(this.goal.proteinPercent);
  }

  get carbsTarget(): number {
    return this.gramsFromPercent(this.goal.carbsPercent);
  }

  get fatsTarget(): number {
    return this.gramsFromPercent(this.goal.fatsPercent, 9);
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

  private updateMacroSummary(): void {
    const totals = this.totalMacros;
    this.mealSummaryService.updateSummary(2000, totals.protein, totals.carbs, totals.fat);
  }

  ngOnInit(): void {
    this.loadMealLogs();
    this.loadGoals();
  }

  // Load meal logs and goals on initialization

  private loadMealLogs(): void {
    this.mealLogs = this.mealLogService.getMealLog();
    this.updateMealSummary();
  }

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

  // Summary calculation for meals

  private updateMealSummary(): void {
    const allFoods = this.getAllFoods();
    const totalCalories = allFoods.reduce((sum, item) => sum + item.calories, 0);
    const totalProtein = this.sumMacro(allFoods, 'protein');
    const totalCarbs = this.sumMacro(allFoods, 'carbs');
    const totalFat = this.sumMacro(allFoods, 'fat');

    this.mealSummaryService.updateSummary(totalCalories, totalProtein, totalCarbs, totalFat);
  }

  
  

  // Database functions 
  deleteFoodFromMeal(meal: string, index: number): void {
    const foodItem = this.mealLogs[meal][index];

    if (!confirm(`Are you sure you want to delete "${foodItem.label}" from ${meal}?`)) return;

    if (!foodItem._id) {
      console.warn(`Cannot delete "${foodItem.label}" — no MongoDB _id found.`);
      return;
    }

    this.mealService.deleteMealEntryById(foodItem._id).subscribe({
      next: () => {
        console.log(`Deleted from DB: ${foodItem._id}`);
        this.mealLogService.deleteFoodFromMeal(meal, index);
        this.loadMealLogs(); // Reload after deletion
        this.deletedMessage = `Deleted ${foodItem.label} from ${meal}.`;
        setTimeout(() => (this.deletedMessage = null), 3000);
      },
      error: (err) => console.error('Failed to delete from DB:', err)
    });
  }

  clearMeal(meal: string): void {
    this.mealLogService.clearMeal(meal);
    this.loadMealLogs(); // Reload after clearing
  }

  clearAllMeals(): void {
    if (!confirm('Are you sure you want to clear all meals for today?')) return;
  
    this.mealLogService.clearAllMeals(); // Clear everything
    this.loadMealLogs(); // Reload empty meal logs
  }
  
}
