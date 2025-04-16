import { Component, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-water-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">Water Intake (ml)</h5>
        <canvas baseChart
                [type]="'bar'"
                [data]="chartData"
                [options]="chartOptions">
        </canvas>
      </div>
    </div>
  `
})
export class WaterChartComponent {
  @Input() labels: string[] = []; // e.g. ['Mon', 'Tue', ...]
  @Input() data: number[] = [];   // e.g. [2000, 2500, ...]

  get chartData() {
    return {
      labels: this.labels,
      datasets: [
        {
          label: 'Water Intake (ml)',
          data: this.data,
          backgroundColor: '#0dcaf0'
        }
      ]
    };
  }

  chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw} ml`
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Day' }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Milliliters' }
      }
    }
  };
}