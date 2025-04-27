import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-meal-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './meal-overview.component.html',
  styleUrls: ['./meal-overview.component.scss']
})
export class MealOverviewComponent {
  @Input() mealsLogged: { [meal: string]: boolean } = {
    Breakfast: false,
    Lunch: false,
    Dinner: false,
    Snack: false
  };

  logMeal(meal: string): void {
   
    console.log(`Add food to ${meal}`);
  }

  onAddFood(): void {
    console.log('Manual food entry');
  }
}

