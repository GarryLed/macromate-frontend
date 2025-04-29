import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = 'http://localhost:5050/calendar'; 

  constructor(private http: HttpClient) {}

  // GET the summary of a specific day
  // This method retrieves the summary of a specific day by sending a GET request to the backend API 
  getDaySummary(date: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${date}`);
  }
}

