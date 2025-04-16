import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EdamamApiService } from '../../services/edamam-api.service';
import { IFoodItem } from '../../interfaces/food-item';
import { MealLogService } from '../../services/meal-log.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  searchQuery: string = '';
  loading = false;
  error: string | null = null;
  searchPerformed = false;

  results: (IFoodItem & { selectedMeal?: string; added?: boolean })[] = [];
  mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  // Temp meal log for demo purposes
  dailyMealLog: { [key: string]: IFoodItem[] } = {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snack: []
  };

  constructor(private edamamService: EdamamApiService, private mealLogService: MealLogService) {}

  onSearch(): void {
    if (!this.searchQuery.trim()) return;

    this.loading = true;
    this.error = null;
    this.searchPerformed = true;

    this.edamamService.searchFood(this.searchQuery).subscribe({
      next: (items) => {
        this.results = items.map(item => ({ ...item }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Edamam API error:', err);
        this.error = 'Failed to fetch food data. Please try again.';
        this.loading = false;
      }
    });
  }

  addToMealLog(item: IFoodItem & { selectedMeal?: string; added?: boolean }): void {
    if (!item.selectedMeal) return;

    const meal = item.selectedMeal;
    const foodEntry = { ...item } as IFoodItem & { selectedMeal?: string; added?: boolean };
    delete foodEntry.selectedMeal;
    delete foodEntry.added;

    this.mealLogService.addFoodToMeal(meal, foodEntry);


    // Show confirmation
    item.added = true;
    setTimeout(() => (item.added = false), 2000);

    console.log(`Added to ${meal}:`, foodEntry);
  }
}
