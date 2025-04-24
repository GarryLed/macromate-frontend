/*
Local Storage Service for Meal Log
persists meal log data in local storage
*/

import { Injectable } from '@angular/core';
import { IFoodItem } from '../interfaces/food-item';

@Injectable({
  providedIn: 'root'
})
export class MealLogService {
  private localStorageKey = 'macromate-meal-log';

  
  private mealLog: { [meal: string]: IFoodItem[] } = {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snack: []
  };

  constructor() {
    this.loadFromLocalStorage();
  }

  // get meal log for a specific meal type
  getMealLog(): { [meal: string]: IFoodItem[] } {
    return this.mealLog;
  }

  // add food to a specific meal 
  addFoodToMeal(meal: string, food: IFoodItem): void {
    this.mealLog[meal].push(food);
    this.saveToLocalStorage();
  }

  // clear all food from a specific meal
  clearMeal(meal: string): void {
    this.mealLog[meal] = [];
    this.saveToLocalStorage();
  }

  // delete a specific food item from a meal
  deleteFoodFromMeal(meal: string, index: number): void {
    this.mealLog[meal].splice(index, 1);
    this.saveToLocalStorage();
  }

  // save the meal log to local storage
  private saveToLocalStorage(): void {
    try {
      const data = JSON.stringify(this.mealLog);
      localStorage.setItem(this.localStorageKey, data);
    } catch (err) {
      console.error('Failed to save meal log:', err);
    }
  }

  // load the meal log from local storage
  private loadFromLocalStorage(): void {
    try {
      const saved = localStorage.getItem(this.localStorageKey);
      if (saved) {
        this.mealLog = JSON.parse(saved);
      }
    } catch (err) {
      console.error('Failed to load meal log:', err);
    }
  }
}
