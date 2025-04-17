import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightGoalComponent } from './weight-goal.component';

describe('WeightGoalComponent', () => {
  let component: WeightGoalComponent;
  let fixture: ComponentFixture<WeightGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightGoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
