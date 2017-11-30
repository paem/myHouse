import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepbystepComponent } from './stepbystep.component';

describe('StepbystepComponent', () => {
  let component: StepbystepComponent;
  let fixture: ComponentFixture<StepbystepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepbystepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepbystepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
