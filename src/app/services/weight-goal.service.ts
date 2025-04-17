import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeightGoalService {
  private currentWeightSubject = new BehaviorSubject<number | null>(null);
  private targetWeightSubject = new BehaviorSubject<number | null>(null);

  currentWeight$ = this.currentWeightSubject.asObservable();
  targetWeight$ = this.targetWeightSubject.asObservable();

  setCurrentWeight(weight: number): void {
    this.currentWeightSubject.next(weight);
  }

  setTargetWeight(weight: number): void {
    this.targetWeightSubject.next(weight);
  }

  clearGoals(): void {
    this.currentWeightSubject.next(null);
    this.targetWeightSubject.next(null);
  }
}

