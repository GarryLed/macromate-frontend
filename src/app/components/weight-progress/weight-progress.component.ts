import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightGoalService } from '../../services/weight-goal.service';
import { FormsModule } from '@angular/forms';
import { WeightGoalComponent } from '../goals/weight-goal.component';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-weight-progress',
  standalone: true,
  imports: [CommonModule, FormsModule, WeightGoalComponent],
  templateUrl: './weight-progress.component.html',
  styleUrls: ['./weight-progress.component.scss']
})
export class WeightProgressComponent implements OnInit {
  // @Input decorator allows passing data from parent component
  @Input() currentWeight: number = 0;
  @Input() startingWeight: number = 85; // hardcoded for now, but will be set by the user 
  @Input() targetWeight: number | null = null;
  

  // Injecting the weight goal service to manage weight goals
  constructor(private weightGoalService: WeightGoalService) {}

  ngOnInit(): void {
    this.weightGoalService.currentWeight$.subscribe(w => this.currentWeight = w ?? 0);
    this.weightGoalService.targetWeight$.subscribe(t => this.targetWeight = t);
  }

  // Getter methods
  // This is the weight lost from the starting weight to the current weight
  get weightLost(): number {
    return this.startingWeight - this.currentWeight;
  }

  // target weight checker that returns true if the target weight is set
  // and false otherwise
  get hasTarget(): boolean {
    return this.targetWeight !== null;
  }

  // how much weight is left to lose (distance to target)
  // this returns the absolute value of the difference between the current weight and the target weight
  // if the target weight is not set, it returns 0
  get distanceToTarget(): number {
    return this.hasTarget ? Math.abs(this.currentWeight - (this.targetWeight ?? 0)) : 0;
  }

  // this returns the direction of the goal (loss or gain)
  // if the target weight is not set, it returns 'gain'
  // if the current weight is greater than the target weight, it returns 'loss'
  get goalDirection(): 'loss' | 'gain' {
    return this.hasTarget && this.currentWeight > this.targetWeight! ? 'loss' : 'gain';
  }

  // this returns a message to be displayed to the user
  // if the target weight is not set, it returns an empty string
  get goalMessage(): string {
    if (!this.hasTarget) return '';
    const wgt = this.distanceToTarget.toFixed(1);
    return this.goalDirection === 'loss'
      ? `You're ${wgt} kg away from your goal weight`
      : `You need to gain ${wgt} kg to reach your target`;
  }

  weighIn(): void {
    console.log('Trigger weigh-in modal (to be implemented)');
  }
}
