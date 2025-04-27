import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoalService } from '../../services/goal.service';
import { Goal } from '../../interfaces/goal';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
})
export class GoalsComponent implements OnInit {
  //  Goals state for demonstration purposes 
  goal: Goal = {
    calorieGoal: 0,
    proteinPercent: 0,
    carbsPercent: 0,
    fatsPercent: 0,
    waterGoal: 0,
  };

  currentWeight: number | null = null;
  targetWeight: number | null = null;

  // UI flags for messages
  nutritionSaved = false;
  weightSaved = false;

  constructor(private goalService: GoalService) {}

  ngOnInit(): void {
    this.loadGoalsFromLocalStorage();
    this.fetchGoalsFromServer();
  }

  //  Load goaals

  private fetchGoalsFromServer(): void {
    this.goalService.getGoals().subscribe({
      next: (goalData: any) => {
        if (goalData) {
          this.goal = {
            calorieGoal: goalData.calorieGoal ?? 0,
            proteinPercent: goalData.proteinPercent ?? 0,
            carbsPercent: goalData.carbsPercent ?? 0,
            fatsPercent: goalData.fatsPercent ?? 0,
            waterGoal: goalData.waterGoal ?? 0
          };
          this.currentWeight = goalData.startingWeight ?? null;
          this.targetWeight = goalData.targetWeight ?? null;
          this.saveGoalsToLocalStorage({ ...this.goal, startingWeight: this.currentWeight, targetWeight: this.targetWeight });
        }
      },
      error: (err) => console.error('Failed to fetch goals:', err)
    });
  }

  // Load and Save Goals to Local Storage 
  private loadGoalsFromLocalStorage(): void {
    const data = localStorage.getItem('userGoals');
    if (data) {
      const parsed = JSON.parse(data);
      this.goal = {
        calorieGoal: parsed.calorieGoal ?? 0,
        proteinPercent: parsed.proteinPercent ?? 0,
        carbsPercent: parsed.carbsPercent ?? 0,
        fatsPercent: parsed.fatsPercent ?? 0,
        waterGoal: parsed.waterGoal ?? 0,
      };
      this.currentWeight = parsed.startingWeight ?? null;
      this.targetWeight = parsed.targetWeight ?? null;
    }
  }

  private saveGoalsToLocalStorage(goalData: any): void {
    localStorage.setItem('userGoals', JSON.stringify(goalData));
  }

  // Save Nutrition Goals

  saveNutritionGoals(): void {
    this.goalService.saveGoals(this.goal).subscribe({
      next: () => {
        this.saveGoalsToLocalStorage({ ...this.goal, startingWeight: this.currentWeight, targetWeight: this.targetWeight });
        this.nutritionSaved = true;
        setTimeout(() => (this.nutritionSaved = false), 3000);
      },
      error: (err) => console.error('Failed to save nutrition goals:', err)
    });
  }

  // Save Weight Goals 

  saveWeightGoals(): void {
    if (this.currentWeight === null || this.targetWeight === null) {
      console.warn('Both starting and target weight are required.');
      return;
    }
  
    const updatedGoal = {
      ...this.goal, 
      startingWeight: this.currentWeight,
      targetWeight: this.targetWeight
    };
  
    this.goalService.saveGoals(updatedGoal).subscribe({
      next: () => {
        this.saveGoalsToLocalStorage(updatedGoal);
        this.weightSaved = true;
        setTimeout(() => (this.weightSaved = false), 3000);
      },
      error: (err) => console.error('Failed to save weight goals:', err)
    });
  }
  
  

  // === Clear Weight Goals (Reset) ===

  clearWeightGoals(): void {
    this.currentWeight = null;
    this.targetWeight = null;
  }
}
