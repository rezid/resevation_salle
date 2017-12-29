import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAddPageComponent } from './room-add-page.component';

describe('RoomAddPageComponent', () => {
  let component: RoomAddPageComponent;
  let fixture: ComponentFixture<RoomAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
