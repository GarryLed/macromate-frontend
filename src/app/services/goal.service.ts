// Service to manage user goals for calories, macronutrients, and water intake
// This service provides methods to get and update user goals.

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'; // import tap and catchError operators
import { Goal } from '../interfaces/goal'; 

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private apiUrl = 'http://localhost:5050/goals'; // Update this when I deploy to the EC2 instance

  constructor(private http: HttpClient) {}

  // POST new or updated goals to the database
  // This will be used to save the goals when the user clicks "Save" in the goal form
  // use pipe operator to handle for logging and error handling
  // tap operator is used to perform side effects (like logging) without modifying the data stream
  saveGoals(goal: Goal): Observable<Goal> {
    return this.http.post<any>(this.apiUrl, goal).pipe(
      tap(_ => console.log('Goals saved successfully.')),
      catchError(this.handleError)
    );
  }

  // GET existing goals from the database
  // This will be used to fetch the goals when the user loads the dashboard
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

