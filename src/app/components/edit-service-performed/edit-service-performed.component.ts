import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ServicePerformedModel } from 'src/app/models/ServicePerformedModel';
import { ServicePerformedService } from 'src/app/services/service-performed/service.performed.service';

@Component({
  standalone: true,
  selector: 'app-edit-service-performed',
  templateUrl: './edit-service-performed.component.html',
  styleUrls: ['./edit-service-performed.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class EditServicePerformedComponent implements OnInit{

  ngOnInit(): void {
    this.getServicePerformedById();
  }
  constructor(
    private servicePerformedService: ServicePerformedService, 
    private dialog: MatDialog, 
    private route: ActivatedRoute){}

  responseReturn!: string;

  apiStatus!: number;
  servicePerformed = {} as ServicePerformedModel;
  servicePerformeds!: ServicePerformedModel[];
  servicePerformedId!: number;

  public status: Array<{name: string}> = [
    {name : "EM_DIA"},
    {name : "ATRASADO"},
    {name : "FINALIZADO"},
    {name : "ENTREGUE"},
  ] ;

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

  getServicePerformedById() {
    this.route.params.subscribe(params => {
      this.servicePerformedService.getServicePerformedById(params['id']).subscribe(
        {next: (value) => {
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
        }}
      );
    });
  }

   editServicePerformed() {
      const servicePerformedData = {
        id: this.servicePerformedForm.get('id')?.value ?? 0,
        description: this.servicePerformedForm.get('description')?.value ?? '',
        observation: this.servicePerformedForm.get('observation')?.value ?? '',
        problemReported: this.servicePerformedForm.get('problemReported')?.value ?? '',
        deliveryDate: this.servicePerformedForm.get('deliveryDate')?.value ?? '',
        laborCost: this.servicePerformedForm.get('laborCost')?.value ?? 0,
        totalValue: this.servicePerformedForm.get('totalValue')?.value ?? 0,
      }
      console.log(servicePerformedData);

       this.servicePerformedService.updateServicePerformed(servicePerformedData).subscribe(
        (result) => {
         alert('Serviço atualizado com Sucesso');
       },
       error => {
         console.log(error)
         alert('Erro ao tentar atualizar dados do serviço: ' + error);
       });
      
    }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.servicePerformed = {} as ServicePerformedModel;
  }

  title = 'edit-service-performed';
}
