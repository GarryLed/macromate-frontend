import { Component, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-weight-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './weight-chart.component.html'
})
export class WeightChartComponent {
  @Input() labels: string[] = [];
  @Input() weights: number[] = [];

  chartData = {
    labels: this.labels,
    datasets: [
      {
        data: this.weights,
        label: 'Weight (kg)',
        fill: true,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0,123,255,0.1)',
        tension: 0.3
      }
    ]
  };

  chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Weight (kg)' } }
    }
  };
}
