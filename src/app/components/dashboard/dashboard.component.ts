import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import all dashboard section components
import { CalorieProgressComponent } from './calorie-progress.component';
import { MealOverviewComponent } from './meal-overview.component';
import { WeightOverviewComponent } from './weight-overview.component';
import { WaterTrackerComponent } from './water-tracker.component';
import { AchievementsComponent } from './achievements.component';
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
    AchievementsComponent,
    QuickLinksComponent
  ],
  templateUrl: './dashboard.component.html',
  //styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Example values – these could eventually come from services

  caloriesConsumed = 1450;
  calorieGoal = 2000;

  mealStatus = {
    Breakfast: true,
    Lunch: false,
    Dinner: true,
    Snack: false
  };

  currentWeight = 79.6;
  startingWeight = 85.0;

  waterDrank = 1800;
  waterGoal = 3000;

  achievements = [
    'Logged 3 Meals',
    'Weighed In',
    'Hit Water Goal'
  ];
}
