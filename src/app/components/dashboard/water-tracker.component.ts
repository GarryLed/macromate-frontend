import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-water-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './water-tracker.component.html',
  styleUrls: ['./water-tracker.component.scss']
})
export class WaterTrackerComponent {
  @Input() waterDrank: number = 0;        
  @Input() waterGoal: number = 0;      
  
  // Event emitter for adding water
  @Output() onAddWater = new EventEmitter<number>(); 
 
  
  readonly glassSize = 250;  // One glass = 250 ml


  // GETTER for progress percentage
  get progress(): number {
    return Math.min((this.waterDrank / this.waterGoal) * 100, 100);
  }

  // Function to add a glass of water (button click handler)
  addGlass(): void {
    const remaining = this.waterGoal - this.waterDrank;
    const amount = remaining >= this.glassSize ? this.glassSize : remaining;
    if (amount > 0) {
      this.onAddWater.emit(amount); // Emit the amount of water added
    }
  }

 
  
}

