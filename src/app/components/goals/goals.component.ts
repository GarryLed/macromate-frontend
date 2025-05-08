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
  //  Goals object to hold the user's goals
  goal: Goal = {
    calorieGoal: 0,
    proteinPercent: 0,
    carbsPercent: 0,
    fatsPercent: 0,
    waterGoal: 0,
  };


  // UI flags for messages
  nutritionSaved = false;


  constructor(private goalService: GoalService) {}

  //  ngOnInit used here to load data when the component is initialized
  ngOnInit(): void {
   
    this.fetchGoalsFromServer();
  }

  //  Fetch Goals from Server 

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
         
       
        }
      },
      error: (err) => console.error('Failed to fetch goals:', err)
    });
  }


  

  // Save Nutrition Goals
  saveNutritionGoals(): void {
    this.goalService.saveGoals(this.goal).subscribe({
      next: () => {
        this.nutritionSaved = true;
        setTimeout(() => (this.nutritionSaved = false), 3000);
      },
      error: (err) => console.error('Failed to save nutrition goals:', err)
    });
  }

}
