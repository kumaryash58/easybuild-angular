import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswerdComponent } from './forgot-passwerd.component';

describe('ForgotPasswerdComponent', () => {
  let component: ForgotPasswerdComponent;
  let fixture: ComponentFixture<ForgotPasswerdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswerdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswerdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
