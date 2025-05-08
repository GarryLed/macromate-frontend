import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EdamamApiService } from '../../services/edamam-api.service';
import { IFoodItem } from '../../interfaces/food-item';
import { MealLogService } from '../../services/meal-log.service'; // Import the MealLogService to persist meal log data in local storage
import { MealService } from '../../services/meal.service'; // Import the MealService to log meals to the backend

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchQuery: string = '';
  loading = false;
  error: string | null = null;
  searchPerformed = false;

  results: (IFoodItem & { selectedMeal?: string; added?: boolean })[] = [];
  mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  // Constructor to inject the EdamamApiService and MealLogService and MealService
  constructor(private edamamService: EdamamApiService, private mealLogService: MealLogService, private mealService: MealService) {}

  // Function that handles the search query and fetches food data from the Edamam API
  onSearch(): void {
    if (!this.searchQuery.trim()) return;

    this.loading = true;
    this.error = null;
    this.searchPerformed = true;

    // Call the Edamam API service to search for food items based on the query 
    this.edamamService.searchFood(this.searchQuery).subscribe({ // call the searchFood function from the EdamamApiService and subscribe to the observable
      next: (items) => {
        this.results = items.map(item => ({ ...item })); // Map the items to include additional properties for selectedMeal 
        this.loading = false; // Set loading to false after fetching the data
      },
      error: (err) => {
        console.error('Edamam API error:', err);
        this.error = 'Failed to fetch food data. Please try again.';
        this.loading = false;
      }
    });
  }

  // Function that adds food item to a selected meal 
  addToMealLog(item: IFoodItem & { selectedMeal?: string; added?: boolean }): void {
    if (!item.selectedMeal) return;
  
    const meal = item.selectedMeal;
    const today = new Date().toISOString().split('T')[0];
  
    // New food entry object to be logged
    const foodEntry: IFoodItem = {
      label: item.label,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
      servingSize: item.servingSize
    };
  
    // Log the meal to the backend via the MealService
    this.mealService.logMeal(today, meal, foodEntry).subscribe({
      next: (res: any) => {
        const insertedId = res.result.insertedId;
  
        // Attach _id to food item which will be used to identify it in the meal item 
        foodEntry._id = insertedId;
        this.mealLogService.addFoodToMeal(meal, foodEntry); // Add food item to local meal log
  
        // Show confirmation that the food item was added
        item.added = true;
        setTimeout(() => (item.added = false), 2000);
  
        console.log(`Logged and saved to ${meal}`, foodEntry);
      },
      error: (err) => {
        console.error('Failed to log meal to DB:', err);
      }
    });
  }
  
  
}
