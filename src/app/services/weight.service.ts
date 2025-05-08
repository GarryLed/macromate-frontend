import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeightLog } from '../interfaces/weight-log';

@Injectable({
  providedIn: 'root'
})
export class WeightService {
  private apiUrl = 'http://localhost:5050/weights'; // Update this when I deploy to the EC2 instance

  constructor(private http: HttpClient) {}

  // GET the current weight endpoint 
  getCurrentWeight(): Observable<WeightLog> {
    return this.http.get<WeightLog>(`${this.apiUrl}/current`); // routes to the current weight endpoint (for most current weight log)
  }

  // GET all weight logs
  getWeightLogs(): Observable<WeightLog[]> {
    return this.http.get<WeightLog[]>(this.apiUrl);
  }

  // POST a new weight log
  addWeightLog(log: WeightLog): Observable<WeightLog> {
    return this.http.post<WeightLog>(this.apiUrl, log);
  }

  // DELETE a weight log entry by ID
  // void is used here because the delete operation does not return any data
  deleteWeightLog(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
