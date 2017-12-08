import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHouseInfoComponent } from './update-house-info.component';

describe('UpdateHouseInfoComponent', () => {
  let component: UpdateHouseInfoComponent;
  let fixture: ComponentFixture<UpdateHouseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateHouseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHouseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
