import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weight-progress',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './weight-progress.component.html',
})
export class WeightProgressComponent {
  weightEntries: { date: string; value: number }[] = [
    { date: '2025-04-10', value: 80.5 },
    { date: '2025-04-11', value: 80.2 },
    { date: '2025-04-12', value: 79.9 },
    { date: '2025-04-13', value: 79.6 }
  ];

  newWeight = { date: '', value: 0 };

  get weightChartData(): ChartConfiguration<'line'>['data'] {
    return {
      labels: this.weightEntries.map(e => e.date),
      datasets: [
        {
          data: this.weightEntries.map(e => e.value),
          label: 'Weight (kg)',
          borderColor: '#007bff',
          backgroundColor: 'rgba(0,123,255,0.1)',
          fill: true,
          tension: 0.3
        }
      ]
    };
  }

  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Weight (kg)' } }
    }
  };

  addWeight() {
    const newEntry = {
      date: this.newWeight.date,
      value: this.newWeight.value
    };
    this.weightEntries.push(newEntry);
    this.newWeight = { date: '', value: 0 };
  }

  /*
  get bmi(): number {
    const latest = this.weightEntries[this.weightEntries.length - 1];
    if (!latest) return 0;
    return latest.value / (this.userHeightM * this.userHeightM);
  }
  
  get bmiStatus(): string {
    const bmi = this.bmi;
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  }

  get trendText(): string {
    if (this.weightEntries.length < 2) return 'Not enough data yet';
  
    const recent = this.weightEntries[this.weightEntries.length - 1];
    const past = this.weightEntries[0]; // or pick an earlier one (e.g., 7 days ago)
  
    const diff = recent.value - past.value;
    const absDiff = Math.abs(diff).toFixed(1);
  
    if (diff < -0.2) return `You’ve lost ${absDiff} kg since ${past.date}.`;
    if (diff > 0.2) return `You’ve gained ${absDiff} kg since ${past.date}.`;
    return 'Weight is stable.';
  }
  */
  
  
}



