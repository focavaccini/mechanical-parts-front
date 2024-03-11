import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePerformedModel } from 'src/app/models/ServicePerformedModel';
import { ServicePerformedService } from 'src/app/services/service-performed/service.performed.service';
import { ApiResponseDialogComponent } from '../api-response-dialog/api-response-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-view-service-performed',
  templateUrl: './view-service-performed.component.html',
  styleUrls: ['./view-service-performed.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule]
})
export class ViewServicePerformedComponent implements OnInit {
  responseReturn!: string;

  apiStatus!: number;
  servicePerformed!: ServicePerformedModel;
  servicePerformeds!: ServicePerformedModel[];
  servicePerformedId!: number;
  servicePerformedData: ServicePerformedModel = {} as ServicePerformedModel;

  servicePerformedForm = new FormGroup({
    id: new FormControl(0),
    description: new FormControl(''),
    observation: new FormControl(''),
    problemReported: new FormControl(''),
    deliveryDate: new FormControl(''),
    laborCost: new FormControl(0),
    totalValue: new FormControl(0),
    professionalName: new FormControl(''),
    daysForDelivery: new FormControl(0),
    status: new FormControl(''),
    car: new FormControl(''),
  })


  constructor(
    private servicePerformedService: ServicePerformedService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.servicePerformed = {} as ServicePerformedModel;
    this.getServicePerformedById();
  }

  getServicePerformedById() {
    this.route.params.subscribe(params => {
      this.servicePerformedService.getServicePerformedById(params['id']).subscribe(
        {
          next: (value) => {
            this.servicePerformed = value
            this.servicePerformedForm.patchValue({
              id: value.id,
              description: value.description,
              observation: value.observation,
              problemReported: value.problemReported,
              deliveryDate: value.deliveryDate,
              laborCost: value.laborCost,
              totalValue: value.totalValue,
              professionalName: value.professional.name,
              daysForDelivery: value.daysForDelivery,
              status: value.status,
              car: value.car.model,
            });
          }
        }
      );
    });
  }

  editServicePerformed(id: number) {
    this.router.navigate(['/edit-service-performed/', id]);
  }

  title = 'view-service-performed';
}
