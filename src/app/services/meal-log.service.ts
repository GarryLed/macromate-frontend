import { Injectable } from '@angular/core';
import { IFoodItem } from '../interfaces/food-item';

@Injectable({
  providedIn: 'root'
})
export class MealLogService {
  private mealLog: { [meal: string]: IFoodItem[] } = {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snack: []
  };

  getMealLog(): { [meal: string]: IFoodItem[] } {
    return this.mealLog;
  }

  addFoodToMeal(meal: string, food: IFoodItem): void {
    this.mealLog[meal].push(food);
  }

  clearMeal(meal: string): void {
    this.mealLog[meal] = [];
  }

  deleteFoodFromMeal(meal: string, index: number): void {
    this.mealLog[meal].splice(index, 1);
  }
}

