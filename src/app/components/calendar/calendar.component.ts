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
  selectedDate: string = this.getToday(); // formatted date string (YYYY-MM-DD) for the selected date, defaulting to today

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

  constructor(private calendarService: CalendarService) {} // inject the CalendarService to fetch data

  ngOnInit(): void {
    this.loadDayData();
  }

  loadDayData(): void {
    console.log('Fetching day data for:', this.selectedDate);

    // call the getDaySummary function from the calendar service and subscribe to the observable
    this.calendarService.getDaySummary(this.selectedDate).subscribe({
      next: (data) => {
        this.summary.totalCalories = data.totalCalories || 0; // assign totalCalories from the response data and set a default value of 0 for error handling
        this.summary.macros = [ // assign macros from the response data
          { label: 'Protein', amount: data.totalProtein || 0 },
          { label: 'Carbs', amount: data.totalCarbs || 0 },
          { label: 'Fats', amount: data.totalFat || 0 },
        ];
        this.summary.water = data.water || 0; // assign water from the response data and set a default value of 0 for error handling
        this.summary.weight = data.weight || 0; // assign weight from the response data and set a default value of 0 for error handling
      },
      error: (err) => {
        console.error('Failed to fetch day summary:', err);
      }
    });
  }

  // Function to return the current date in YYYY-MM-DD format (delimated by "T" [0] to get the date part)
  private getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
}
