import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsConfiguration } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  calorieGoal = 2000;
  caloriesConsumed = 1500;
  calorieProgress = Math.round((this.caloriesConsumed / this.calorieGoal) * 100);

  proteinPercent = 40;
  carbsPercent = 35;
  fatsPercent = 25;

  waterGoal = 3000;
  waterConsumed = 2200;
  waterProgress = Math.round((this.waterConsumed / this.waterGoal) * 100);

  badges = [
    { title: '3-Day Streak' },
    { title: 'Hydration Hero' },
    { title: 'Consistent Logger' },
  ];

  weightLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  weightChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.weightLabels,
    datasets: [
      {
        data: [80.5, 80.2, 79.8, 79.5, 79.0],
        label: 'Weight (kg)',
        borderColor: '#007bff',
        tension: 0.4,
        fill: false,
      },
    ]
  };

  weightChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };
}

