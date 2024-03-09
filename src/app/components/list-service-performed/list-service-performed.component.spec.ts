import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServicePerformedComponent } from './list-service-performed.component';

describe('ListServicePerformedComponent', () => {
  let component: ListServicePerformedComponent;
  let fixture: ComponentFixture<ListServicePerformedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListServicePerformedComponent]
    });
    fixture = TestBed.createComponent(ListServicePerformedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
