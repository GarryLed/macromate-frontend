import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  //styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent {
  @Input() achievements: string[] = []; // Example: ['Logged 3 Meals', 'Weighed In']
}

