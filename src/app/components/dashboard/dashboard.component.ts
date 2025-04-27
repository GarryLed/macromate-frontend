import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealSummaryService } from '../../services/meal-summary.service';

// Import all dashboard section components
import { CalorieProgressComponent } from './calorie-progress.component';
import { MealOverviewComponent } from './meal-overview.component';
import { WeightOverviewComponent } from './weight-overview.component';
import { WaterTrackerComponent } from './water-tracker.component';
import { MacroProgressComponent } from './macro-progress.component';
import { QuickLinksComponent } from './quick-links.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CalorieProgressComponent,
    MealOverviewComponent,
    WeightOverviewComponent,
    WaterTrackerComponent,
    MacroProgressComponent,
    QuickLinksComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
 
  proteinConsumed = 0;
  carbsConsumed = 0;
  fatConsumed = 0;

  constructor(private mealSummaryService: MealSummaryService) {}

  ngOnInit() {
    this.mealSummaryService.protein$.subscribe(value => this.proteinConsumed = value);
    this.mealSummaryService.carbs$.subscribe(value => this.carbsConsumed = value);
    this.mealSummaryService.fat$.subscribe(value => this.fatConsumed = value);
  }

  // calories section data 
  caloriesConsumed = 1450;
  calorieGoal = 2000;

  // meals section data
  mealStatus = {
    Breakfast: true,
    Lunch: false,
    Dinner: true,
    Snack: false
  };

  // weight section data
  currentWeight = 79.6;
  startingWeight = 85.0;

  // water section data
  waterDrank = 1800;
  waterGoal = 3000;

  // MacroProgress section data
  MacroProgress = [
    'Logged 3 Meals',
    'Weighed In',
    'Hit Water Goal'
  ];
}
