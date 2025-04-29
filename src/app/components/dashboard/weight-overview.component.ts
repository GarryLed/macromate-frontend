import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-weight-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './weight-overview.component.html',
  styleUrls: ['./weight-overview.component.scss']
})
export class WeightOverviewComponent {
  @Input() currentWeight: number = 0;

  weighIn(): void {
    console.log('Trigger weigh-in modal (to be implemented)');
  }
}
