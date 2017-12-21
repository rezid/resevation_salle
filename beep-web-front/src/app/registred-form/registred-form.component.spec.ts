import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistredFormComponent } from './registred-form.component';

describe('RegistredFormComponent', () => {
  let component: RegistredFormComponent;
  let fixture: ComponentFixture<RegistredFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistredFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistredFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
