// CalendarDay interface and class definition
// This file defines the CalendarDay interface and class, which represent a day in the calendar with relevant nutritional information and meals.
import { IFoodItem } from '../interfaces/food-item'; 

export interface ICalendarDay {
    _id?: string;
    date: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    water: number;
    weight: number;
    meals: {
        breakfast: IFoodItem[];
        lunch: IFoodItem[];
        dinner: IFoodItem[];
        snack: IFoodItem[];
        };
}

export class CalendarDay implements ICalendarDay {
    _id?: string;
    date: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    water: number;
    weight: number;
    meals: {
        breakfast: IFoodItem[];
        lunch: IFoodItem[];
        dinner: IFoodItem[];
        snack: IFoodItem[];
    };

    constructor(date:string, calories:number, protein:number, carbs:number, fat:number, water:number, weight:number, meals:{breakfast: IFoodItem[], lunch: IFoodItem[], dinner: IFoodItem[], snack: IFoodItem[]}) {
        this.date = date;
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.water = water;
        this.weight = weight;
        this.meals = meals;
    }
}

