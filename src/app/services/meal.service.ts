/*
This service manages the meal logging functionality of the application.
It allows users to log their meals by sending a POST request to the backend API with the meal details.
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFoodItem } from '../interfaces/food-item';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = 'http://localhost:5050/meals';

  constructor(private http: HttpClient) {}

  // Log a meal by sending a POST request to the backend API
  logMeal(date: string, mealType: string, foodItem: IFoodItem) {
    return this.http.post(this.apiUrl, { date, mealType, foodItem });
  }

  
  // delete a meal entry by sending a DELETE request to the backend API
  deleteMealEntry(date: string, mealType: string, foodItem: any) {
    return this.http.request('delete', this.apiUrl, {
      body: { date, mealType, foodItem }
    });
  }

  // delete a meal entry by ID
  deleteMealEntryById(id: string) {
    return this.http.delete(`http://localhost:5050/meals/${id}`);
  }
  
  
}

