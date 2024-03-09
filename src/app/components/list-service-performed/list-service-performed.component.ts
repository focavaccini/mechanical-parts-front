import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePerformedModel } from 'src/app/models/ServicePerformedModel';
import { ServicePerformedService } from 'src/app/services/service-performed/service.performed.service';

@Component({
  standalone: true,
  selector: 'app-list-service-performed',
  templateUrl: './list-service-performed.component.html',
  styleUrls: ['./list-service-performed.component.css'],
  imports: [ReactiveFormsModule, NgForOf]
})
export class ListServicePerformedComponent implements OnInit {

  servicePerformed = {} as ServicePerformedModel;
  servicesPerformed!: ServicePerformedModel[];

  professionalForm = new FormGroup({
    id: new FormControl(''),
    totalValue: new FormControl(''),
    daysForDelivery: new FormControl(''),
    status: new FormControl(''),
  })

constructor(
  private servicePerformedService: ServicePerformedService, 
  private router: Router, 
  private route: ActivatedRoute){}

ngOnInit() {
  this.getServicePerformeds();
}

getServicePerformeds(){
  this.servicePerformedService.getServicePerformeds().subscribe((servicesPerformed: ServicePerformedModel[])  =>{
    this.servicesPerformed = servicesPerformed;
    console.log(this.servicesPerformed);
  })
}

title = 'list-service-performed';
}
