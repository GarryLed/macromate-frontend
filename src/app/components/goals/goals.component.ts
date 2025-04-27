import { Component, OnInit } from '@angular/core';
import { GoalService } from '../../services/goal.service';
import { Goal } from '../../interfaces/goal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './goals.component.html',
  //styleUrls: ['./goals.component.scss'],
  
})
export class GoalsComponent implements OnInit {
  goal: Goal = {
    calorieGoal: 0,
    proteinPercent: 0,
    carbsPercent: 0,
    fatsPercent: 0,
    waterGoal: 0,
   
  };

  currentWeight: number | null = null;
  targetWeight: number | null = null;

  nutritionSaved = false;
  weightSaved = false;

  constructor(private goalService: GoalService) {}

  ngOnInit(): void {
    this.goalService.getGoals().subscribe({
      next: (goalData: any) => {
        if (goalData) {
          this.goal = goalData;
          this.currentWeight = goalData.startingWeight ?? null;
          this.targetWeight = goalData.targetWeight ?? null;
        }
      },
      error: (err) => {
        console.error('Failed to fetch goals:', err);
      }
    });
  }

  // Function to save nutrition goals
  saveNutritionGoals(): void {
    const update = {
      calorieGoal: this.goal.calorieGoal,
      proteinPercent: this.goal.proteinPercent,
      carbsPercent: this.goal.carbsPercent,
      fatsPercent: this.goal.fatsPercent,
      waterGoal: this.goal.waterGoal
    };

    this.goalService.saveGoals(update).subscribe({
      next: () => {
        this.nutritionSaved = true;
        setTimeout(() => (this.nutritionSaved = false), 3000);
      },
      error: (err) => {
        console.error('Failed to save nutrition goals:', err);
      }
    });
  }

  // Function to save weight goals
  saveWeightGoals(): void {
    const update = {
      startingWeight: this.currentWeight,
      targetWeight: this.targetWeight
    };

    this.goalService.saveGoals(update).subscribe({
      next: () => {
        this.weightSaved = true;
        setTimeout(() => (this.weightSaved = false), 3000);
      },
      error: (err) => {
        console.error('Failed to save weight goals:', err);
      }
    });
  }

  clearWeightGoals(): void {
    this.currentWeight = null;
    this.targetWeight = null;
  }
}
