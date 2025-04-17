import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weight-goal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weight-goal.component.html',
 // styleUrls: ['./weight-goal.component.scss']
})
export class WeightGoalComponent {
  currentWeight: number | null = null;
  targetWeight: number | null = null;

  saveWeightGoals(): void {
    console.log('Saved weight goals:', {
      currentWeight: this.currentWeight,
      targetWeight: this.targetWeight
    });

    // TODO: Call service to save to DB
  }

  clearWeightGoals(): void {
    this.currentWeight = null;
    this.targetWeight = null;
  }
}

