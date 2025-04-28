import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarService } from '../../services/calendar-day.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  selectedDate: string = this.getToday(); // default to today

  summary = {
    totalCalories: 0,
    macros: [
      { label: 'Protein', amount: 0 },
      { label: 'Carbs', amount: 0 },
      { label: 'Fats', amount: 0 },
    ],
    water: 0,
    weight: 0,
  };

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.loadDayData();
  }

  loadDayData(): void {
    console.log('Fetching day data for:', this.selectedDate);

    this.calendarService.getDaySummary(this.selectedDate).subscribe({
      next: (data) => {
        this.summary.totalCalories = data.totalCalories || 0;
        this.summary.macros = [
          { label: 'Protein', amount: data.totalProtein || 0 },
          { label: 'Carbs', amount: data.totalCarbs || 0 },
          { label: 'Fats', amount: data.totalFat || 0 },
        ];
        this.summary.water = data.water || 0;
        this.summary.weight = data.weight || 0;
      },
      error: (err) => {
        console.error('Failed to fetch day summary:', err);
      }
    });
  }

  private getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
}
