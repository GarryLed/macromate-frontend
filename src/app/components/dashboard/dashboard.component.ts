import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealSummaryService } from '../../services/meal-summary.service';
import { GoalService } from '../../services/goal.service';
import { Goal } from '../../interfaces/goal';

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
 
  // Calorie data 
  caloriesConsumed = 0; // Default value for testing
  calorieGoal = 0; // Default value for testing


  // Macro data 
  proteinConsumed = 0;
  carbsConsumed = 0;
  fatConsumed = 0;

  // Macro goals
  proteinGoal = 0; // Default value for testing
  carbsGoal = 0; // Default value for testing
  fatGoal = 0; // Default value for testing

  // === Meals Section Status ===
  mealStatus = {
    Breakfast: true,
    Lunch: false,
    Dinner: true,
    Snack: false
  };

  // Weight Section Data 
  currentWeight = 79.6;
  startingWeight = 85.0;

  //  Water Tracker Data 
  waterDrank = 0;
  waterGoal = 0;

 goal: Goal = {
    calorieGoal: 0,
    waterGoal: 0,
    proteinPercent: 0,
    carbsPercent: 0,
    fatsPercent: 0,
  };

  constructor(
    private goalService: GoalService,
    private mealSummaryService: MealSummaryService
  ) {}

  ngOnInit() {
    this.mealSummaryService.loadFromLocalStorage(); // load the macros from local storage to persist the data 

    // Subscribe to the meal summary service to get the latest values
    this.mealSummaryService.protein$.subscribe(value => this.proteinConsumed = value);
    this.mealSummaryService.carbs$.subscribe(value => this.carbsConsumed = value);
    this.mealSummaryService.fat$.subscribe(value => this.fatConsumed = value);

    // Subscribe to the calorie summary service to get the latest values
    this.mealSummaryService.calories$.subscribe(value => this.caloriesConsumed = value);

    // subscribe to nutritian goals to get the latest values
    this.goalService.getGoals().subscribe(value => this.calorieGoal = value.calorieGoal); 
    this.goalService.getGoals().subscribe(value => this.waterGoal = value.waterGoal); 

    // These are not working as expected
    this.goalService.getGoals().subscribe(value => this.proteinGoal = value.proteinPercent); 
    this.goalService.getGoals().subscribe(value => this.carbsGoal = value.carbsPercent); 
    this.goalService.getGoals().subscribe(value => this.fatGoal = value.fatsPercent); 
  } 
  
  
  

}
