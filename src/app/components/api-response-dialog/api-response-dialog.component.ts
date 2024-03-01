import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-api-response-dialog',
  templateUrl: './api-response-dialog.component.html',
  styleUrls: ['./api-response-dialog.component.css']
    })

export class ApiResponseDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public apiResponse: string) {}
}
