import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-water-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './water-tracker.component.html',
 // styleUrls: ['./water-tracker.component.scss']
})
export class WaterTrackerComponent {
  @Input() waterDrank: number = 0;        // e.g. 1800 ml
  @Input() waterGoal: number = 3000;      // e.g. 3000 ml
  readonly glassSize = 250;               // One glass = 250 ml

  get progress(): number {
    return Math.min((this.waterDrank / this.waterGoal) * 100, 100);
  }

  addGlass(): void {
    this.waterDrank = Math.min(this.waterDrank + this.glassSize, this.waterGoal);
  }
}

