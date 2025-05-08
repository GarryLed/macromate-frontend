// services/water-intake.service.ts
// // This service manages the water intake records for the user. 
// It allows adding new records, retrieving all records, and calculating total water intake for a specific date.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWaterIntake } from '../interfaces/water-intake';

@Injectable({
  providedIn: 'root'
})
export class WaterIntakeService {
  private apiUrl = 'http://localhost:5050/water'; // Update this when I deploy to the EC2 instance

  constructor(private http: HttpClient) {}

  // POST => Add a new water intake entry (POST /water)
  addWaterIntake(intake: IWaterIntake): Observable<IWaterIntake> {
    return this.http.post<IWaterIntake>(`${this.apiUrl}`, intake);
  }

  // GET => Get all water intake records for a specific date (GET /water/:date)
  getWaterIntakeForDate(date: string): Observable<IWaterIntake[]> {
    return this.http.get<IWaterIntake[]>(`${this.apiUrl}/${date}`);
  }

  // GET => Get total water intake for a specific date (GET /water/total/:date)
  getTotalForDate(date: string): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/total/${date}`);
  }
}


