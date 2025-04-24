// Service to manage user goals for calories, macronutrients, and water intake
// This service provides methods to get and update user goals.
// It uses a singleton pattern to ensure that there is only one instance of the service throughout the application.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Goal } from '../interfaces/goal'; // Assuming you have a Goal interface defined

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private apiUrl = 'http://localhost:5050/goals';

  constructor(private http: HttpClient) {}

  saveGoals(goal: any) {
    return this.http.post<Goal>(this.apiUrl, goal);
  }

  getGoals() {
    return this.http.get<Goal>(this.apiUrl);
  }
}
