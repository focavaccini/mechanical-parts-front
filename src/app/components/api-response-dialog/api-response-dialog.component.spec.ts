import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiResponseDialogComponent } from './api-response-dialog.component';

describe('ApiResponseDialogComponent', () => {
  let component: ApiResponseDialogComponent;
  let fixture: ComponentFixture<ApiResponseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiResponseDialogComponent]
    });
    fixture = TestBed.createComponent(ApiResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
