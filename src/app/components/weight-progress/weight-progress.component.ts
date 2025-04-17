import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightGoalService } from '../../services/weight-goal.service';

@Component({
  selector: 'app-weight-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weight-progress.component.html',
 // styleUrls: ['./weight-progress.component.scss']
})
export class WeightProgressComponent implements OnInit {
  @Input() currentWeight: number = 0;
  @Input() startingWeight: number = 85; // hardcoded for now, but will be set by the user 
  @Input() targetWeight: number | null = null;
  

  constructor(private weightGoalService: WeightGoalService) {}

  ngOnInit(): void {
    this.weightGoalService.currentWeight$.subscribe(w => this.currentWeight = w ?? 0);
    this.weightGoalService.targetWeight$.subscribe(t => this.targetWeight = t);
  }

  // This is the weight lost from the starting weight to the current weight
  get weightLost(): number {
    return this.startingWeight - this.currentWeight;
  }

  // target weight 
  get hasTarget(): boolean {
    return this.targetWeight !== null;
  }

  // how much weight is left to lose 
  get distanceToTarget(): number {
    return this.hasTarget ? Math.abs(this.currentWeight - (this.targetWeight ?? 0)) : 0;
  }

  get goalDirection(): 'loss' | 'gain' {
    return this.hasTarget && this.currentWeight > this.targetWeight! ? 'loss' : 'gain';
  }

  get goalMessage(): string {
    if (!this.hasTarget) return '';
    const delta = this.distanceToTarget.toFixed(1);
    return this.goalDirection === 'loss'
      ? `You're ${delta} kg away from your goal weight`
      : `You need to gain ${delta} kg to reach your target`;
  }
}
