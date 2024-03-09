import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarModel } from 'src/app/models/CarModel';

import { ProductModel } from 'src/app/models/ProductModel';
import { ProfessionalModel } from 'src/app/models/ProfessionalModel';
import { ServicePerformedModel } from 'src/app/models/ServicePerformedModel';
import { CarService } from 'src/app/services/car/car.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { ServicePerformedService } from 'src/app/services/service-performed/service.performed.service';

@Component({
  // standalone: true,
  selector: 'app-register-service-performed',
  templateUrl: './register-service-performed.component.html',
  styleUrls: ['./register-service-performed.component.css'],
})
export class RegisterServicePerformedComponent {

  servicePerformed = {} as ServicePerformedModel;

  constructor(private servicePerformedService: ServicePerformedService,
    private professionalService: ProfessionalService,
    private carService: CarService,
    private productService: ProductService) { }

  professionals!: ProfessionalModel[];
  products!: ProductModel[];
  cars!: CarModel[];
  professional = {} as ProductModel;

  ngOnInit() {
    this.listProfessionals();
    this.listProducts();
    this.listCars();
  }

  listCars() {
    this.carService.getCars().subscribe((cars: CarModel[]) => {
      this.cars = cars;
    });
  }

  listProducts() {
    this.productService.getProducts().subscribe((products: ProductModel[]) => {
      this.products = products;
      this.products.forEach(product => product.quantity = 0);
    });
  }

  listProfessionals() {
    this.professionalService.getProfessionals().subscribe((professionals: ProfessionalModel[]) => {
      this.professionals = professionals;
    })
  }

  saveServicePerfomed(form: NgForm) {
    debugger;
    if (this.products && this.products.length > 0) {
      const productsTotal = this.products
        .filter(product => product.selected)
        .reduce((total, product) => total + (product.value * product.quantity), 0);

      this.servicePerformed.totalValue = productsTotal + this.servicePerformed.laborCost;
    }
    this.servicePerformed.usedProducts = this.products;

    const selectedCarName = form.value.car;
    const selectedCar = this.cars.find(car => car.model === selectedCarName);
    this.servicePerformed.car = selectedCar;

    const selectedProfessionalName = form.value.professional;
    const selectedProfessional = this.professionals.find(professional => professional.name === selectedProfessionalName);
    this.servicePerformed.professional = selectedProfessional;
    this.servicePerformedService.saveServicePerformed(this.servicePerformed).subscribe(
      (response: any) => {
        alert('Serviço cadastrado com sucesso!')
        this.cleanForm(form);
      }
    )
  }

  calculateTotal() {
    if (this.products && this.products.length > 0) {
      // Calcula o valor total com base nos produtos selecionados e suas quantidades
      const productsTotal = this.products.filter(product => product.selected)
        .reduce((total, product) => total + (product.value * product.quantity), 0);

      // Adiciona o custo da mão de obra ao valor total
      this.servicePerformed.totalValue = productsTotal + this.servicePerformed.laborCost;
    }
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.servicePerformed = {} as ServicePerformedModel;
  }

  title = 'register-service-performed';
}
