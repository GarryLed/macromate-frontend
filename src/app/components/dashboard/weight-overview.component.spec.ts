import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightOverviewComponent } from './weight-overview.component';

describe('WeightOverviewComponent', () => {
  let component: WeightOverviewComponent;
  let fixture: ComponentFixture<WeightOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
