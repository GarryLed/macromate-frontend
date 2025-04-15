import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightProgressComponent } from './weight-progress.component';

describe('WeightProgressComponent', () => {
  let component: WeightProgressComponent;
  let fixture: ComponentFixture<WeightProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
