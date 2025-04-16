import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './goals.component.html'
})
export class GoalsComponent {
  goal: any;
  submitted = false;

  constructor(private goalService: GoalService) {
    this.goal = this.goalService.getGoal();
  }

  saveGoals() {
    this.goalService.updateGoal(this.goal);
    this.submitted = true;
    setTimeout(() => this.submitted = false, 3000);
  }
}


