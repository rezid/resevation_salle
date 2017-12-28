import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailPageComponent } from './room-detail-page.component';

describe('RoomDetailComponent', () => {
  let component: RoomDetailPageComponent;
  let fixture: ComponentFixture<RoomDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
