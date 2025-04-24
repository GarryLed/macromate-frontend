import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFoodItem } from '../interfaces/food-item';

@Injectable({
  providedIn: 'root'
})
export class EdamamApiService {
  private _siteURL = "http://localhost:5050/foods"; // Proxy to Express API

  constructor(private _http: HttpClient) {}

  // Search for food by name, via Express backend
  searchFood(query: string): Observable<IFoodItem[]> {
    return this._http.get<IFoodItem[]>(`${this._siteURL}?q=${encodeURIComponent(query)}`);
  }

  
  private handleError (err:HttpErrorResponse) {
    console.log('EdamamApiService: ' + err.message);
    return err.message;
  }
  
}
