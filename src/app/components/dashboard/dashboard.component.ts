import { Component } from '@angular/core';
import { WeightChartComponent } from '../weight-chart/weight-chart.component';  
import { MacroChartComponent } from '../macro-chart/macro-chart.component';
import { WaterChartComponent } from '../water-chart/water-chart.component';
import { CaloriesChartComponent } from '../calories-chart/calories-chart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    WeightChartComponent,
    MacroChartComponent,
    WaterChartComponent,
    CaloriesChartComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  weightLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  weightData = [80.5, 80.3, 80.1, 79.8, 79.5];

  macroData = [160, 220, 60]; // P, C, F
  waterData = [2500, 3000, 2000, 2800, 2600];
  calorieData = [1800, 2000, 1900, 2100, 1950];
}

