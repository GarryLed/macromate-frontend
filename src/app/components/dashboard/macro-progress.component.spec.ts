import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroProgressComponent } from './macro-progress.component';

describe('MacroProgressComponent', () => {
  let component: MacroProgressComponent;
  let fixture: ComponentFixture<MacroProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacroProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacroProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
