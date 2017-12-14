import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorMoreInfoComponent } from './contractor-more-info.component';

describe('ContractorMoreInfoComponent', () => {
  let component: ContractorMoreInfoComponent;
  let fixture: ComponentFixture<ContractorMoreInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorMoreInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
