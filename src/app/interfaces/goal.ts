// Interface and class for user goals in the application
// This file defines the structure of the goal object and provides a constructor for creating new goal instances.
export interface IGoal {
  _id?: string;
  calorieGoal: number;
  proteinPercent: number;
  carbsPercent: number;
  fatsPercent: number;
  waterGoal: number;
 
  updatedAt?: string;
}

export class Goal implements IGoal {
  _id?: string;
  calorieGoal: number;
  proteinPercent: number;
  carbsPercent: number;
  fatsPercent: number;
  waterGoal: number;
 
  updatedAt?: string;

  constructor(
    calorieGoal: number,
    proteinPercent: number,
    carbsPercent: number,
    fatsPercent: number,
    waterGoal: number,
  
  
  ) {
    this.calorieGoal = calorieGoal;
    this.proteinPercent = proteinPercent;
    this.carbsPercent = carbsPercent;
    this.fatsPercent = fatsPercent;
    this.waterGoal = waterGoal;
   
  }
}
