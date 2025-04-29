import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeightService } from '../../services/weight.service';
import { WeightLog } from '../../interfaces/weight-log';

@Component({
  selector: 'app-weight-progress',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weight-progress.component.html',
  styleUrls: ['./weight-progress.component.scss'],
})
export class WeightProgressComponent implements OnInit {
  weightLogs: WeightLog[] = [];
  newWeight: number | null = null;

  weightSaved = false;
  loading = false;

  constructor(private weightService: WeightService) {}

  ngOnInit(): void {
    this.fetchWeightLogs();
  }

  // Function to fetch weight logs from the server
  fetchWeightLogs(): void {
    this.loading = true;
    this.weightService.getWeightLogs().subscribe({
      next: (logs) => {
        this.weightLogs = logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load weight logs:', err);
        this.loading = false;
      }
    });
  }

  // Function to save a new weight log entry
  saveWeight(): void {
    if (this.newWeight === null) return;

    const entry: WeightLog = {
      weight: this.newWeight,
      date: new Date().toISOString().split('T')[0] // yyyy-mm-dd format
    };

    // use the weightService to add the new weight log entry
    this.weightService.addWeightLog(entry).subscribe({
      next: () => {
        this.newWeight = null;
        this.weightSaved = true;
        this.fetchWeightLogs();
        setTimeout(() => (this.weightSaved = false), 3000);
      },
      error: (err) => console.error('Failed to save weight:', err)
    });
  }

  // Function to delete a weight log entry
  deleteWeight(id: string): void {
    if (!confirm('Are you sure you want to delete this weight entry?')) {
      return;
    }
  
    this.weightService.deleteWeightLog(id).subscribe({
      next: () => {
        this.fetchWeightLogs(); // Refresh list after deletion
      },
      error: (err) => console.error('Failed to delete weight:', err)
    });
  }
  
}
