import { Component, Injectable, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/models/ClientModel';
import { ClientService } from 'src/app/services/client/client.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { ApiResponseDialogComponent } from 'src/app/components/api-response-dialog/api-response-dialog.component';
import { StateModel } from 'src/app/models/StateModel';
import { CityModel } from 'src/app/models/CityModel';
import { StateService } from 'src/app/services/state/state.service';
import { CommonModule } from '@angular/common';
import { CityService } from 'src/app/services/city/city.service';

@Component({
  standalone: true,
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
  imports: [
    ReactiveFormsModule, 

    CommonModule]
})

export class EditClientComponent implements OnInit {
  states: StateModel[] = [];
  cities: CityModel[] = [];

  public fuels: Array<{name: string}> = [
    {name : "GASOLINA"},
    {name : "ALCOOL"},
    {name : "DIESEL"},
    {name : "ELETRICO"},
  ] ;

  public genders: Array<{name: string}> = [
    {name : "MASCULINO"},
    {name : "FEMININO"},
    {name : "OUTROS"},
  ] ;

  responseReturn!: string;
  apiStatus!: string;
  clientId!: number;

  clientForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    cpf: new FormControl(''),
    sexo: new FormControl(''),
    birthdate: new FormControl(''),
   
    addressId: new FormControl(''),
    addressNeighborhood: new FormControl(''),
    addressComplement: new FormControl(''),
    addressNumber: new FormControl(''),
    addressStreet: new FormControl(''),
    addressCep: new FormControl(''),

    addressCityId: new FormControl(''),
    addressCity: new FormControl(''),
    
    addressStateId: new FormControl(''),
    addressState: new FormControl(''),
    addressStateSigla: new FormControl(''),

    carId: new FormControl(''),
    carModel: new FormControl(''),
    carColor: new FormControl(''),
    carLicensePlate: new FormControl(''),
    carFuel: new FormControl(''),
    carYearOfManufacture: new FormControl(''),
  })

  constructor(
    private clienteService: ClientService,
    private cityService: CityService,
    private stateService: StateService,
    private dialog: MatDialog, 
    private fb: FormBuilder,
    private route: ActivatedRoute){}

  ngOnInit() {
    this.getClient()
    this.getStates()
    this.getCities()
  }

  getStates(){
    this.stateService.getStates().subscribe((state: StateModel[]) =>{
      this.states = state;
    });
  }

  getCities(){
    this.cityService.getCities().subscribe((city: CityModel[]) =>{
      this.cities = city;
    });
  }

  changedCities(selectedState: string) {
    console.log('changedCities');
    this.getCitiesByNameState(selectedState);
  }

  getCitiesByNameState(stateName: string){
    const estadoSelecionado = stateName.split(': ')[1];
    this.cityService.getCityByNameState(estadoSelecionado).subscribe((city: CityModel[]) =>{
      this.cities = city;
    });
  }


  getClient() {
    console.log("entrou");
    this.route.params.subscribe(params =>{
      console.log(params['id']);
      this.clienteService.getClientById(params['id']).subscribe(
      {next:(value)=>{
          console.log(value)
          this.clientForm.patchValue({
            id: value.id,
            name: value.name,
            phone: value.phone,
            email: value.email,
            cpf: value.cpf,
            sexo: value.sexo,
            birthdate: value.birthdate,
            addressId: value.address.id,
            addressStreet: value.address.street,
            addressNumber: value.address.number,
            addressCep: value.address.cep,
            addressNeighborhood: value.address.neighborhood,
            addressComplement: value.address.complement,
            addressCityId: value.address.city.id,
            addressCity: value.address.city.name,
            addressStateId: value.address.city.state.id,
            addressState: value.address.city.state.name,
            carId: value.car.id,
            carColor: value.car.color,
            carFuel: value.car.fuel,
            carLicensePlate: value.car.licensePlate,
            carModel: value.car.model,
            carYearOfManufacture: value.car.yearOfManufacture
          });

      }, error:(err) =>{
          console.log(err)
      }}
      );
    });
    console.log(this.clientForm);
  }

  updateClient() {
    const clientData: ClientModel = {
      id: this.clientForm.get('id')?.value ?? 0,
      name: this.clientForm.get('name')?.value ?? '',
      email: this.clientForm.get('email')?.value ?? '',
      phone: this.clientForm.get('phone')?.value ?? '',
      cpf: this.clientForm.get('cpf')?.value ?? '',
      sexo: this.clientForm.get('sexo')?.value ?? '',
      birthdate: this.clientForm.get('birthdate')?.value ?? '',
      address: {
        id: this.clientForm.get('addressId')?.value ?? 0,
        street: this.clientForm.get('addressStreet')?.value ?? '',
        neighborhood: this.clientForm.get('addressNeighborhood')?.value ?? '',
        complement: this.clientForm.get('addressComplement')?.value ?? '',
        number: this.clientForm.get('addressNumber')?.value ?? '',
        cep: this.clientForm.get('addressCep')?.value ?? '',
        city: {
          id: this.clientForm.get('addressCityId')?.value ?? 0,
          name: this.clientForm.get('addressCity')?.value ?? '',
          state: {
            id: this.clientForm.get('addressStateId')?.value ?? 0,
            name: this.clientForm.get('addressState')?.value ?? '',
            sigla: this.clientForm.get('addressStateSigla')?.value ?? '',
          }
        }
      },
      car: {
        id: this.clientForm.get('carId')?.value ?? '',
        model: this.clientForm.get('carModel')?.value ?? '',
        color: this.clientForm.get('carColor')?.value ?? '',
        licensePlate: this.clientForm.get('carLicensePlate')?.value ?? '',
        fuel: this.clientForm.get('carFuel')?.value ?? '',
        yearOfManufacture: this.clientForm.get('carYearOfManufacture')?.value ?? '',
      }
    };
    
    this.clienteService.updateClient(clientData).subscribe(
      response => {
        alert('Cliente atualizado com Sucesso');
      },
      error => {
        alert('Erro ao tentar atualizar dados do cliente' + error);
      }
    );
  }

  openDialog(apiResponse: string): void {
    const dialogRef = this.dialog.open(ApiResponseDialogComponent, {
      width: '300px',
      data: apiResponse,
    });
  }
  title = 'update-client';
}
