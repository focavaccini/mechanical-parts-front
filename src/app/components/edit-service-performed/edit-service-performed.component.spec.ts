import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServicePerformedComponent } from './edit-service-performed.component';

describe('EditServicePerformedComponent', () => {
  let component: EditServicePerformedComponent;
  let fixture: ComponentFixture<EditServicePerformedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditServicePerformedComponent]
    });
    fixture = TestBed.createComponent(EditServicePerformedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
