// Interface and class for user goals in the application
// This file defines the structure of the goal object and provides a constructor for creating new goal instances.
export interface IGoal {
    _id?: string;             
    calories: number;         
    proteinPercent: number;   
    carbsPercent: number;     
    fatsPercent: number;      
    waterTarget: number;      
  }
  
  export class Goal implements IGoal {
    _id?: string;
    calories: number;
    proteinPercent: number;
    carbsPercent: number;
    fatsPercent: number;
    waterTarget: number;
  
    constructor(calories: number, proteinPercent: number, carbsPercent: number, fatsPercent: number, waterTarget: number) {
      this.calories = calories;
      this.proteinPercent = proteinPercent;
      this.carbsPercent = carbsPercent;
      this.fatsPercent = fatsPercent;
      this.waterTarget = waterTarget;
    }
  }
  