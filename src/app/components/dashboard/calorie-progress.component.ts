import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-calorie-progress',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './calorie-progress.component.html',
  styleUrls: ['./calorie-progress.component.scss']
})
export class CalorieProgressComponent {
  @Input() caloriesConsumed: number = 0; // Default value for testing
  @Input() calorieGoal: number = 2500; // Default value for testing

  // GETTERS for progress bar
  get progress(): number {
    return Math.min((this.caloriesConsumed / this.calorieGoal) * 100, 100);
  }

  get progressLabel(): string {
    return `${this.caloriesConsumed} / ${this.calorieGoal} kcal`;
  }

  get progressColor(): string {
    return this.caloriesConsumed > this.calorieGoal ? 'bg-danger' : 'bg-success';
  }

  
}
