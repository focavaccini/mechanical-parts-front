import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentServicePerformedComponent } from './payment-service-performed.component';

describe('PaymentServicePerformedComponent', () => {
  let component: PaymentServicePerformedComponent;
  let fixture: ComponentFixture<PaymentServicePerformedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentServicePerformedComponent]
    });
    fixture = TestBed.createComponent(PaymentServicePerformedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
