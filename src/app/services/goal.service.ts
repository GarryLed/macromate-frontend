// Service to manage user goals for calories, macronutrients, and water intake
// This service provides methods to get and update user goals.

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Goal } from '../interfaces/goal'; 

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private apiUrl = 'http://localhost:5050/goals'; // Update this when I deploy to the EC2 instance

  constructor(private http: HttpClient) {}

  // POST new or updated goals
  saveGoals(goal: Goal): Observable<any> {
    return this.http.post<any>(this.apiUrl, goal).pipe(
      tap(_ => console.log('Goals saved successfully.')),
      catchError(this.handleError)
    );
  }

  // GET existing goals
  getGoals(): Observable<Goal> {
    return this.http.get<Goal>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Error handler
  private handleError(error: HttpErrorResponse) {
    console.error('GoalService Error:', error);
    return throwError(() => new Error('An error occurred while processing your request.'));
  }
}

