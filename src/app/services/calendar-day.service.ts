import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DaySummary } from '../interfaces/day-summary'; // import the DaySummary interface

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = 'http://localhost:5050/calendar'; // Update this when I deploy to the EC2 instance

  constructor(private http: HttpClient) {}

  // GET the summary of a specific day
  // This method retrieves the summary of a specific day by sending a GET request to the backend API 
  // uses Observable (stream of data) <DaySummary>(the interface) will emit the DaySummary object when subscribed to
  getDaySummary(date: string): Observable<DaySummary> {
    return this.http.get<DaySummary>(`${this.apiUrl}/${date}`);
  }
}

