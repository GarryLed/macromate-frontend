import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatDate } from '@angular/common';

// Import services
import { GoalService } from '../../services/goal.service';
import { MealSummaryService } from '../../services/meal-summary.service';
import { WeightService } from '../../services/weight.service';
import { WaterIntakeService } from '../../services/water-intake.service';
import { MealLogService } from '../../services/meal-log.service';

// Import interface
import { Goal } from '../../interfaces/goal';

// Dashboard section for child components
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
export class DashboardComponent implements OnInit {
  // Macronutrient data
  caloriesConsumed = 0;
  calorieGoal = 0;

  proteinConsumed = 0;
  carbsConsumed = 0;
  fatConsumed = 0;

  proteinGoal = 0;
  carbsGoal = 0;
  fatGoal = 0;

  // Weight data
  currentWeight = 0;

  // Water tracker data 
  waterDrank = 0;
  waterGoal = 0;
  readonly today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US'); // Today's date in YYYY-MM-DD format (keeps it consistent with the DB)

  // Meal status (based on meal logs for the day)
  // This will be used to show a "yes" if  the meal has been logged, or a "-" if not
  // defaults to false (not logged)
  mealStatus = {
    Breakfast: false,
    Lunch: false,
    Dinner: false,
    Snack: false
  };

  // Goal object to hold the user's goals
  goal: Goal = {
    calorieGoal: 0,
    waterGoal: 0,
    proteinPercent: 0,
    carbsPercent: 0,
    fatsPercent: 0,
  };

  // Constructor to inject services
  // These services will be used to fetch data from the backend and update the UI
  constructor(
    private goalService: GoalService,
    private mealSummaryService: MealSummaryService,
    private weightService: WeightService,
    private mealLogService: MealLogService,
    private waterIntakeService: WaterIntakeService
  ) {}

  ngOnInit(): void {
    // Load local macros (persist state across sessions)
    this.mealSummaryService.loadFromLocalStorage();

    this.mealSummaryService.protein$.subscribe(val => this.proteinConsumed = val);
    this.mealSummaryService.carbs$.subscribe(val => this.carbsConsumed = val);
    this.mealSummaryService.fat$.subscribe(val => this.fatConsumed = val);
    this.mealSummaryService.calories$.subscribe(val => this.caloriesConsumed = val);

    // Load goals (calorie and water)
    this.goalService.getGoals().subscribe(goal => {
      this.calorieGoal = goal.calorieGoal;
      this.waterGoal = goal.waterGoal;
    });

    // Load current weight from DB
    this.weightService.getCurrentWeight().subscribe({
      next: weightLog => {
        this.currentWeight = weightLog?.weight || 0;
        console.log('Current weight:', this.currentWeight);
      },
      error: err => console.error('Weight fetch error:', err)
    });

    // Load today's total water from DB
    this.waterIntakeService.getTotalForDate(this.today).subscribe({
      next: data => this.waterDrank = data.total,
      error: err => console.error('Water fetch error:', err)
    });

    // Load meal status toggles
    this.mealLogService.getMealLog().subscribe(log => {
      this.mealStatus.Breakfast = log['Breakfast'].length > 0;
      this.mealStatus.Lunch = log['Lunch'].length > 0;
      this.mealStatus.Dinner = log['Dinner'].length > 0;
      this.mealStatus.Snack = log['Snack'].length > 0;
    });
  }

  // Called when user adds water from WaterTrackerComponent
  logWater(amount: number): void {
    const intake = { date: this.today, amount };

    this.waterIntakeService.addWaterIntake(intake).subscribe({
      next: () => this.waterDrank += amount,
      error: err => console.error('Failed to log water:', err)
    });
  }
}
