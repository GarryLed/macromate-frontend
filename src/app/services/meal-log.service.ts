/*
Local Storage Service for Meal Log
persists meal log data in local storage
*/

import { Injectable } from '@angular/core';
import { IFoodItem } from '../interfaces/food-item';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealLogService {
  private localStorageKey = 'macromate-meal-log';

  // Internal state (BehaviorSubject makes it reactive)
  private mealLogSubject = new BehaviorSubject<{ [meal: string]: IFoodItem[] }>({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snack: []
  });

  constructor() {
    this.loadFromLocalStorage();
  }

  // Public observable for components to subscribe to
  getMealLog(): Observable<{ [meal: string]: IFoodItem[] }> {
    return this.mealLogSubject.asObservable();
  }

  // Add food to a meal
  addFoodToMeal(meal: string, food: IFoodItem): void {
    const current = this.mealLogSubject.getValue();
    const updated = { ...current, [meal]: [...current[meal], food] };
    this.mealLogSubject.next(updated);
    this.saveToLocalStorage(updated);
  }

  // Clear all food from a meal
  clearMeal(meal: string): void {
    const current = this.mealLogSubject.getValue();
    const updated = { ...current, [meal]: [] };
    this.mealLogSubject.next(updated);
    this.saveToLocalStorage(updated);
  }

  // Delete a specific food item by index
  deleteFoodFromMeal(meal: string, index: number): void {
    const current = this.mealLogSubject.getValue();
    const updatedMeal = [...current[meal]];
    updatedMeal.splice(index, 1);
    const updated = { ...current, [meal]: updatedMeal };
    this.mealLogSubject.next(updated);
    this.saveToLocalStorage(updated);
  }

  // Load meal log from localStorage on service init
  private loadFromLocalStorage(): void {
    try {
      const saved = localStorage.getItem(this.localStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.mealLogSubject.next(parsed);
      }
    } catch (err) {
      console.error('Failed to load meal log:', err);
    }
  }

  // Save current meal log to localStorage
  private saveToLocalStorage(data: { [meal: string]: IFoodItem[] }): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(this.localStorageKey, serialized);
    } catch (err) {
      console.error('Failed to save meal log:', err);
    }
  }

  // Clear all meals and reset subject
  clearAllMeals(): void {
    const cleared = {
      Breakfast: [],
      Lunch: [],
      Dinner: [],
      Snack: []
    };
    this.mealLogSubject.next(cleared);
    localStorage.removeItem(this.localStorageKey);
  }
}
