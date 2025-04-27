import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weight-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weight-overview.component.html',
  styleUrls: ['./weight-overview.component.scss']
})
export class WeightOverviewComponent {
  @Input() currentWeight: number = 0;
  @Input() startingWeight: number = 0;

  get weightChange(): number {
    return this.currentWeight - this.startingWeight;
  }

  get weightDeltaDisplay(): string {
    const delta = this.weightChange;
    return delta > 0 ? `↑ +${delta.toFixed(1)} kg` : `↓ ${Math.abs(delta).toFixed(1)} kg`;
  }

  get weightDeltaColor(): string {
    return this.weightChange < 0 ? 'text-success' : 'text-danger';
  }

  weighIn(): void {
    console.log('Trigger weigh-in modal (to be implemented)');
  }
}
