import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHouseInfoComponent } from './create-house-info.component';

describe('CreateHouseInfoComponent', () => {
  let component: CreateHouseInfoComponent;
  let fixture: ComponentFixture<CreateHouseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHouseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHouseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
