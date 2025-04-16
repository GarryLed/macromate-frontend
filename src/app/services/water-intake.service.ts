// services/water-intake.service.ts
// // This service manages the water intake records for the user. 
// It allows adding new records, retrieving all records, and calculating total water intake for a specific date.

import { Injectable } from '@angular/core';
import { IWaterIntake } from '../interfaces/water-intake';

@Injectable({
  providedIn: 'root'
})
export class WaterIntakeService {
  private waterIntakes: IWaterIntake[] = [];

  constructor() {}

  // Add a new water intake record
  addWaterIntake(waterIntake: IWaterIntake): void {
    this.waterIntakes.push(waterIntake);
  }

  // Get all records
  getWaterIntakes(): IWaterIntake[] {
    return this.waterIntakes;
  }

  // Get total water intake for a specific date
  getTotalWaterIntake(date: string): number {
    return this.waterIntakes
      .filter(intake => intake.date === date)
      .reduce((total, intake) => total + intake.amount, 0);
  }
}

