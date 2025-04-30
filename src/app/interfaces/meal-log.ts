// This file defines the structure of a meal log entry in the application.
 // It includes properties for the date, meal type, food items consumed, and nutritional totals.
 import { IFoodItem } from './food-item';
 
 export interface IMealLog {
   _id?: string;                     
   date: string;                   
   mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
   foods: IFoodItem[];              // Array of food items
   totalCalories: number;
   totalProtein: number;
   totalCarbs: number;
   totalFat: number;
 }
 
 /*
 export interface MealLog {
    Breakfast: any[]; // Replace 'any' with the appropriate type if known
    Lunch: any[];
    Dinner: any[];
    Snack: any[];
 }  
*/
 export class MealLog implements IMealLog {
   _id?: string;
   date: string;
   mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
   foods: IFoodItem[];
   totalCalories: number;
   totalProtein: number;
   totalCarbs: number;
   totalFat: number;
 
   constructor(
     date: string,
     mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack',
     foods: IFoodItem[]
   ) {
     this.date = date;
     this.mealType = mealType;
     this.foods = foods;
 
     // Calculate totals from foods
     this.totalCalories = this.sum('calories');
     this.totalProtein = this.sum('protein');
     this.totalCarbs = this.sum('carbs');
     this.totalFat = this.sum('fat');
   }
 
 
   private sum(key: keyof IFoodItem): number {
     return this.foods.reduce((sum, food) => sum + (typeof food[key] === 'number' ? food[key] : 0), 0);
   }
 }