import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FoodItem } from '../../interfaces/food-item';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {
  selectedDate: string = this.formatToday();
  mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  logs: { [meal: string]: FoodItem[] } = {};
  summary = {
    totalCalories: 0,
    macros: [
      { label: 'Protein', amount: 0 },
      { label: 'Carbs', amount: 0 },
      { label: 'Fat', amount: 0 }
    ],
    water: 0,
    weight: 0
  };

  // Load mock data for selected day
  loadDayData() {
    if (this.selectedDate === '2025-04-10') {
      this.logs = {
        Breakfast: [
          { label: 'Oats', calories: 150, protein: 5, carbs: 27, fat: 3, servingSize: '1 cup' }
        ],
        Lunch: [
          { label: 'Chicken Wrap', calories: 400, protein: 30, carbs: 35, fat: 10, servingSize: '1 wrap' }
        ],
        Dinner: [],
        Snack: [
          { label: 'Protein Shake', calories: 200, protein: 25, carbs: 5, fat: 2, servingSize: '1 scoop' }
        ]
      };

      this.summary = {
        totalCalories: 750,
        macros: [
          { label: 'Protein', amount: 60 },
          { label: 'Carbs', amount: 67 },
          { label: 'Fat', amount: 15 }
        ],
        water: 2000,
        weight: 79.6
      };
    } else {
      this.logs = { Breakfast: [], Lunch: [], Dinner: [], Snack: [] };
      this.summary = {
        totalCalories: 0,
        macros: [
          { label: 'Protein', amount: 0 },
          { label: 'Carbs', amount: 0 },
          { label: 'Fat', amount: 0 }
        ],
        water: 0,
        weight: 0
      };
    }
  }

  private formatToday(): string {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  }

  ngOnInit() {
    this.loadDayData();
  }
}
