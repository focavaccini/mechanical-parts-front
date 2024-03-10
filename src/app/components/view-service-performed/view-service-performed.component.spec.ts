import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServicePerformedComponent } from './view-service-performed.component';

describe('ViewServicePerformedComponent', () => {
  let component: ViewServicePerformedComponent;
  let fixture: ComponentFixture<ViewServicePerformedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewServicePerformedComponent]
    });
    fixture = TestBed.createComponent(ViewServicePerformedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
