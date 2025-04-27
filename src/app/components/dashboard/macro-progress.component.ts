import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-macro-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './macro-progress.component.html',
  styleUrls: ['./macro-progress.component.scss']
})
export class MacroProgressComponent {
  // Protein 
  @Input() proteinConsumed: number = 145; // Default protein consumed (will be replaced by user input)
  @Input() proteinGoal: number = 150; // Default protein goal (will be replaced by user input)

  // Carbs 
  @Input() carbsConsumed: number = 144; // Default carbs consumed (will be replaced by user input)
  @Input() carbsGoal: number = 250; // Default carbs goal (will be replaced by user input)

  // Fat
  @Input() fatConsumed: number = 20; // Default fat consumed (will be replaced by user input)  
  @Input() fatGoal: number = 60; // Default fat goal (will be replaced by user input)


  // Protein Progress
  get proteinProgress(): number {
    return Math.min((this.proteinConsumed / this.proteinGoal) * 100, 100);
  }

  get proteinProgressLabel(): string {
    return `${this.proteinConsumed} / ${this.proteinGoal} g`;
  }

  get proteinProgressColor(): string {
    return this.proteinConsumed > this.proteinGoal ? 'bg-danger' : 'bg-success';
  }
  
// Carbs Progress
  get carbsProgress(): number {
    return Math.min((this.carbsConsumed / this.carbsGoal) * 100, 100);
  }

  get carbsProgressLabel(): string {
    return `${this.carbsConsumed} / ${this.carbsGoal} g`;
  }

  get carbsProgressColor(): string {
    return this.carbsConsumed > this.carbsGoal ? 'bg-danger' : 'bg-success';
  }

  // Fat Progress
  get fatProgress(): number {
    return Math.min((this.fatConsumed / this.fatGoal) * 100, 100);
  }

  get fatProgressLabel(): string {
    return `${this.fatConsumed} / ${this.fatGoal} g`;
  }

  get fatProgressColor(): string {
    return this.fatConsumed > this.fatGoal ? 'bg-danger' : 'bg-success';
  }
}