import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalService } from '../../services/goal.service';
import { Goal } from '../../interfaces/goal';

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
export class DashboardComponent implements OnInit {
 

  currentWeight: number = 0;
  startingWeight: number = 0;

  constructor(private goalService: GoalService) {}

  ngOnInit(): void {
    this.goalService.getGoals().subscribe({
      next: (goalData: Goal) => {
        this.startingWeight = goalData.startingWeight ?? 0;
        this.currentWeight = goalData.startingWeight ?? goalData.startingWeight ?? 0;
      },
      error: (err) => {
        console.error('Failed to fetch goals:', err);
      }
    });

  // calories section data 


  // meals section data
 

  // weight section data
 

  // water section data
 

  // achievements section data
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
 
   // achievements section data
   achievements = [
     'Logged 3 Meals',
     'Weighed In',
     'Hit Water Goal'
 
}}
