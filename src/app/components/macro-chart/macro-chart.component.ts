import { Component, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-macro-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">Macro Breakdown</h5>
        <canvas baseChart
                [type]="'doughnut'"
                [data]="chartData"
                [options]="chartOptions">
        </canvas>
      </div>
    </div>
  `
})
export class MacroChartComponent {
  @Input() data: number[] = []; // [protein, carbs, fat]

  get chartData() {
    return {
      labels: ['Protein', 'Carbs', 'Fat'],
      datasets: [
        {
          data: this.data,
          backgroundColor: ['#198754', '#0dcaf0', '#ffc107'],
          hoverBackgroundColor: ['#157347', '#0aa2c0', '#e0a800']
        }
      ]
    };
  }

  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true
        }
      }
    }
  };
}
