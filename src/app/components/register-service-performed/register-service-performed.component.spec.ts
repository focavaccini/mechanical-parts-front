import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterServicePerformedComponent } from './register-service-performed.component';

describe('RegisterServicePerformedComponent', () => {
  let component: RegisterServicePerformedComponent;
  let fixture: ComponentFixture<RegisterServicePerformedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterServicePerformedComponent]
    });
    fixture = TestBed.createComponent(RegisterServicePerformedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
