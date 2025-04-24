// This file defines the IWeightEntry interface and the WeightEntry class, which represent a weight entry in the application.
// It includes properties for the date and weight, with an optional ID for database storage.

export interface IWeightEntry {
    _id?: string;    
    date: string;     
    weight: number; 
    unit: 'kg' | 'lb'; // Added unit property to specify weight unit
    note?: string; // Added note property for additional information
  }
  
  export class WeightEntry implements IWeightEntry {
    _id?: string;
    date: string;
    weight: number;
    unit: 'kg' | 'lb'; 
    note?: string; 
  
    constructor(date: string, weight: number, unit: 'kg' | 'lb', note?: string) {
        this.date = date;
        this.weight = weight;
        this.unit = unit; 
        this.note = note; 
    }

    
    // Method to calculate weight in kg or lb based on the unit property
    get weightInKg(): number {
        return this.unit === 'kg' ? this.weight : this.weight * 0.453592;
      }
      
  }
  