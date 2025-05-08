import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealSummaryService {
  // private writable streams for macros and calories
  // BehaviorSubject is used to hold the current value and emit it to subscribers
  private _calories = new BehaviorSubject<number>(0); 
  private _protein = new BehaviorSubject<number>(0);
  private _carbs = new BehaviorSubject<number>(0);
  private _fat = new BehaviorSubject<number>(0);

  // public readable streams for macros and calories
  calories$ = this._calories.asObservable();
  protein$ = this._protein.asObservable();
  carbs$ = this._carbs.asObservable();
  fat$ = this._fat.asObservable();

  // Update macros and calories
  updateSummary(calories: number, protein: number, carbs: number, fat: number): void {
    this._calories.next(calories);
    this._protein.next(protein);
    this._carbs.next(carbs);
    this._fat.next(fat);

  }
}
