import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealLogService } from '../../services/meal-log.service';
import { WeightService } from '../../services/weight-service.service';
import { FoodItem } from '../../interfaces/food-item';
import { WeightLog } from '../../interfaces/weight-log';
import { MealEntry } from '../../interfaces/meal-entry';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  selectedDate: string = this.getToday(); // defaults to today
  mealTypes: string[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  logs: { [mealType: string]: MealEntry[] } = {}; 
  summary: {
    
    totalCalories: number;
    macros: { label: string; amount: number }[];
    water: number;
    weight: number;
  } = {
    totalCalories: 0,
    macros: [],
    water: 0,
    weight: 0,
  };

  constructor(
    private mealLogService: MealLogService,
    private weightService: WeightService
  ) {}

  ngOnInit(): void {
    this.loadDayData();
  }

  loadDayData(): void {
    console.log('Loading data for date:', this.selectedDate); // for testing 

    this.loadMeals();
   // this.loadWater();
    this.loadWeight();
  }

  private loadMeals(): void {
    const allMeals = this.mealLogService.getMealLog();
    console.log('All meals:', allMeals); // for testing
    this.logs = {};
  
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
  
    for (const mealType of this.mealTypes) {
      const mealItems = (allMeals[mealType] || []).filter(item => item.date === this.selectedDate); // filter by selected date
  
     
      this.logs[mealType] = mealItems.map(item => ({
        _id: item._id,
        date: item.date!,
        mealType: mealType,
        foodItem: {
          label: item.label,
          calories: item.calories,
          protein: item.protein,
          carbs: item.carbs,
          fat: item.fat,
          servingSize: item.servingSize,
          image: item.image,
          date: item.date
        }
      }));
  
      // Summarize macros and calories
      for (const item of this.logs[mealType]) {
        totalCalories += item.foodItem.calories || 0;
        totalProtein += item.foodItem.protein || 0;
        totalCarbs += item.foodItem.carbs || 0;
        totalFat += item.foodItem.fat || 0;
      }
    }
  
    this.summary.totalCalories = this.roundToOneDecimal(totalCalories);
    this.summary.macros = [
      { label: 'Protein', amount: this.roundToOneDecimal(totalProtein) },
      { label: 'Carbs', amount: this.roundToOneDecimal(totalCarbs) },
      { label: 'Fats', amount: this.roundToOneDecimal(totalFat) },
    ];
  }
  

  private loadWeight(): void {
    this.weightService.getWeightLogs().subscribe({
    
      next: (logs: WeightLog[]) => {
        console.log('Weight logs:', logs); // for testing
        const weightEntry = logs.find(log => log.date === this.selectedDate);
        this.summary.weight = weightEntry ? weightEntry.weight : 0;
      },
      error: (err) => {
        console.error('Failed to load weight logs:', err);
        this.summary.weight = 0;
      }
    });
  }

  private roundToOneDecimal(value: number): number {
    return Math.round(value * 10) / 10;
  }

  private getToday(): string {
    return new Date().toISOString().split('T')[0]; // yyyy-mm-dd
  }
}
