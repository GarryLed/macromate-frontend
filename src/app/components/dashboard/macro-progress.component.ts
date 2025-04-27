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
  //  Macros Inputs (protein, carbs, fats)
  @Input() proteinConsumed = 0;
  @Input() proteinGoal = 150;

  @Input() carbsConsumed = 0;
  @Input() carbsGoal = 250;

  @Input() fatConsumed = 0;
  @Input() fatGoal = 60;

  // Round results to one decimal place 
  private roundToOneDecimal(value: number): number {
    return Math.round(value * 100) / 10;
  }

  // Daily Progress Calculations 
  
  // Daily Protein progress
  get proteinProgress(): number {
    return this.calculateProgress(this.proteinConsumed, this.proteinGoal);
  }

  get proteinProgressLabel(): string {
    return this.formatProgressLabel(this.proteinConsumed, this.proteinGoal);
  }

  get proteinProgressColor(): string {
    return this.getProgressColor(this.proteinConsumed, this.proteinGoal);
  }

  // Daily Carbs progress
  get carbsProgress(): number {
    return this.calculateProgress(this.carbsConsumed, this.carbsGoal);
  }

  get carbsProgressLabel(): string {
    return this.formatProgressLabel(this.carbsConsumed, this.carbsGoal);
  }

  get carbsProgressColor(): string {
    return this.getProgressColor(this.carbsConsumed, this.carbsGoal);
  }

  // Daily Fat progress 
  get fatProgress(): number {
    return this.calculateProgress(this.fatConsumed, this.fatGoal);
  }

  get fatProgressLabel(): string {
    return this.formatProgressLabel(this.fatConsumed, this.fatGoal);
  }

  get fatProgressColor(): string {
    return this.getProgressColor(this.fatConsumed, this.fatGoal);
  }

  // Methods to calculate progress, format labels, and get colors

  private calculateProgress(consumed: number, goal: number): number {
    return Math.min((consumed / goal) * 100, 100);
  }

  private formatProgressLabel(consumed: number, goal: number): string {
    return `${consumed} / ${goal} g`;
  }

  private getProgressColor(consumed: number, goal: number): string {
    return consumed > goal ? 'bg-danger' : 'bg-success';
  }
}
