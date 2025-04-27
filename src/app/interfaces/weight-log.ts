// This file defines the IWeightEntry interface and the WeightEntry class, which represent a weight entry in the application.
// It includes properties for the date and weight, with an optional ID for database storage.

export interface IWeightLog {
    _id?: string;    
    date: string;     
    weight: number; 
    
  }
  
  export class WeightLog implements IWeightLog {
    _id?: string;
    date: string;
    weight: number;
   
  
    constructor(date: string, weight: number) {
        this.date = date;
        this.weight = weight;
       
    }

  
      
  }
  