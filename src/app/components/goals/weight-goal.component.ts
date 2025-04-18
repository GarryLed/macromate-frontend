import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeightGoalService } from '../../services/weight-goal.service';

@Component({
  selector: 'app-weight-goal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weight-goal.component.html',
 // styleUrls: ['./weight-goal.component.scss']
})
export class WeightGoalComponent {

  constructor(private weightGoalService: WeightGoalService) {} // Injecting the weightgoal service

  currentWeight: number | null = null;
  targetWeight: number | null = null;

  saveWeightGoals(): void {
    if (this.currentWeight !== null) {
      this.weightGoalService.setCurrentWeight(this.currentWeight);
    }
    if (this.targetWeight !== null) {
      this.weightGoalService.setTargetWeight(this.targetWeight);
    }
  
    console.log('Weight goals saved!');
  }
  
  clearWeightGoals(): void {
    this.currentWeight = null;
    this.targetWeight = null;
    this.weightGoalService.clearGoals();
  }
}

