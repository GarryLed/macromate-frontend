import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealSummaryService {
  private _calories = new BehaviorSubject<number>(0); 
  private _protein = new BehaviorSubject<number>(0);
  private _carbs = new BehaviorSubject<number>(0);
  private _fat = new BehaviorSubject<number>(0);

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

    // Save calories and macros to localStorage
    localStorage.setItem('macroSummary', JSON.stringify({ calories, protein, carbs, fat }));
  }

  // Load saved summary from localStorage 
  loadFromLocalStorage(): void {
    const data = localStorage.getItem('macroSummary');
    if (data) {
      const { calories, protein, carbs, fat } = JSON.parse(data);

      this._calories.next(calories ?? 0);
      this._protein.next(protein ?? 0);
      this._carbs.next(carbs ?? 0);
      this._fat.next(fat ?? 0);
    }
  }
}
