// FoodItem interface and class definition
// This file defines the FoodItem interface and class, which represent a food item with its nutritional information.

  export interface IFoodItem {
    _id?: string;
    label: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    servingSize: string;
    image?: string; 
  }                                 

  export class FoodItem implements IFoodItem {
    _id?: string;
    label: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    servingSize: string;
    image?: string;

    constructor(label:string, calories:number, protein:number, carbs:number, fat:number, servingSize:string, image?:string) {   
        this.label = label;
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.servingSize = servingSize;
        this.image = image;
        }
}
  
