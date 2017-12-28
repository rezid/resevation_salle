import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPriceInfoComponent } from './room-price-info.component';

describe('RoomPriceInfoComponent', () => {
  let component: RoomPriceInfoComponent;
  let fixture: ComponentFixture<RoomPriceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomPriceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomPriceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
