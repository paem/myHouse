import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalhelpComponent } from './professionalhelp.component';

describe('ProfessionalhelpComponent', () => {
  let component: ProfessionalhelpComponent;
  let fixture: ComponentFixture<ProfessionalhelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalhelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalhelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
