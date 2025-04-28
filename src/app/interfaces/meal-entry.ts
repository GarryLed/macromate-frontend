import { IFoodItem } from './food-item';

// this is the interface for a meal entry in the meal log
export interface MealEntry {
  _id?: string;
  date: string;          
  mealType: string;       
  foodItem: IFoodItem;    
}
