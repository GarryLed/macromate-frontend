import { Component, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-calories-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">Daily Calorie Intake</h5>
        <canvas baseChart
                [type]="'bar'"
                [data]="chartData"
                [options]="chartOptions">
        </canvas>
      </div>
    </div>
  `
})
export class CaloriesChartComponent {
  @Input() labels: string[] = []; // e.g. ['Mon', 'Tue', 'Wed']
  @Input() data: number[] = [];   // e.g. [1800, 2000, 1950]
  @Input() goal: number = 2000;   // Optional: target calorie goal

  get chartData() {
    return {
      labels: this.labels,
      datasets: [
        {
          label: 'Calories Consumed',
          data: this.data,
          backgroundColor: '#ffc107'
        },
        {
          label: 'Target',
          data: this.labels.map(() => this.goal),
          type: 'line',
          borderColor: '#dc3545',
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0.3
        }
      ]
    };
  }

  chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw} kcal`
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Day' }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Calories' }
      }
    }
  };
}
