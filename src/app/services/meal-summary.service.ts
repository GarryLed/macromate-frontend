import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealSummaryService {
  private _protein = new BehaviorSubject<number>(0); // Initialize with 0 grams of protein but will hold the latest value
  private _carbs = new BehaviorSubject<number>(0);
  private _fat = new BehaviorSubject<number>(0);

  protein$ = this._protein.asObservable();
  carbs$ = this._carbs.asObservable();
  fat$ = this._fat.asObservable();

  updateMacros(protein: number, carbs: number, fat: number) {
    this._protein.next(protein);
    this._carbs.next(carbs);
    this._fat.next(fat);
  }
}

