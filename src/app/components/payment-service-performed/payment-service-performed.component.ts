import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePerformedModel } from 'src/app/models/ServicePerformedModel';
import { ServicePerformedPaymentModel } from 'src/app/models/ServicePerformedModelPayment';
import { ServicePerformedService } from 'src/app/services/service-performed/service.performed.service';

@Component({
  selector: 'app-payment-service-performed',
  templateUrl: './payment-service-performed.component.html',
  styleUrls: ['./payment-service-performed.component.css'],
})
export class PaymentServicePerformedComponent implements OnInit {

  constructor(private servicePerformedService: ServicePerformedService,
    private route: ActivatedRoute,
    private router: Router,) { }

  responseReturn!: string;

  apiStatus!: number;
  servicePerformedPayment!: ServicePerformedPaymentModel;
  servicePerformed!: ServicePerformedModel;
  servicePerformedsPayment!: ServicePerformedPaymentModel[];
  servicePerformedPaymentId!: number;
  servicePerformedPaymentData: ServicePerformedPaymentModel = {} as ServicePerformedPaymentModel;

  ngOnInit() {
    this.servicePerformedPayment = {} as ServicePerformedPaymentModel;
    this.getServicePerformedById();
  }

  public payments: Array<{ name: string }> = [
    { name: "DINHEIRO" },
    { name: "CARTAO" },
    { name: "PIX" },
    { name: "CHEQUE" },
  ];

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

  savePaymentServicePerformed(form: NgForm) {
    this.servicePerformedService.savePaymentServicePerformed(this.servicePerformedPayment).subscribe(
      (response: any) => {
      alert('Serviço cadastrado com sucesso!')
      this.cleanForm(form);
    })
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.servicePerformedPayment = {} as ServicePerformedPaymentModel;
  }

  title = 'payment-service-performed';
}
