import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerMoreInfoComponent } from './broker-more-info.component';

describe('BrokerMoreInfoComponent', () => {
  let component: BrokerMoreInfoComponent;
  let fixture: ComponentFixture<BrokerMoreInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerMoreInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
