import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalorieProgressComponent } from './calorie-progress.component';

describe('CalorieProgressComponent', () => {
  let component: CalorieProgressComponent;
  let fixture: ComponentFixture<CalorieProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalorieProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalorieProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
