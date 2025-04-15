import { Component } from '@angular/core';
import { FoodItem } from '../../interfaces/food-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  searchQuery = '';
  loading = false;
  error: string | null = null;
  searchPerformed = false;

  results: FoodItem[] = [];

  // Mock search logic (will replace with Edamam API later)
  onSearch() {
    this.loading = true;
    this.error = null;
    this.searchPerformed = true;

    setTimeout(() => {
      // Simulate matching mock data
      if (this.searchQuery.toLowerCase().includes('apple')) {
        this.results = [
          { label: 'Apple, raw', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, servingSize: '1 medium (182g)' },
          { label: 'Apple juice, unsweetened', calories: 113, protein: 0.2, carbs: 28, fat: 0.2, servingSize: '1 cup (248g)' }
        ];
      } else if (this.searchQuery.toLowerCase().includes('chicken')) {
        this.results = [
          { label: 'Chicken breast, grilled', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g' }
        ];
      } else {
        this.results = [];
      }

      this.loading = false;
    }, 800); // Simulate API delay
  }
}

