import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddressModel } from 'src/app/models/AddressModel';
import { CarModel } from 'src/app/models/CarModel';
import { CityModel } from 'src/app/models/CityModel';
import { ClientModel } from 'src/app/models/ClientModel';
import { StateModel } from 'src/app/models/StateModel';
import { CityService } from 'src/app/services/city/city.service';
import { ClientService } from 'src/app/services/client/client.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent {

  client = {} as ClientModel;
  car = {} as CarModel;
  address = {} as AddressModel;
  state = {} as StateModel;
  city = {} as CityModel;

  states: StateModel[] = [];
  cities: CityModel[] = [];

  public fuels: Array<{ name: string }> = [
    { name: "GASOLINA" },
    { name: "ALCOOL" },
    { name: "DIESEL" },
    { name: "ELETRICO" },
  ];

  public genders: Array<{ name: string }> = [
    { name: "MASCULINO" },
    { name: "FEMININO" },
    { name: "OUTROS" },
  ];

  rn: string | undefined;

  constructor(
    private clientService: ClientService,
    private stateService: StateService,
    private cityService: CityService) { }

  ngOnInit() {
    this.rn;
    this.getStates()
    this.getCities()
  }

  getStates() {
    this.stateService.getStates().subscribe(
      (states: StateModel[]) => {
        this.states = states;
        // Após obter os estados, também carregue as cidades para o primeiro estado da lista
        if (this.states.length > 0) {
          this.getCitiesByNameState(this.states[0].name);
        }
      },
      (error) => {
        console.error('Erro ao obter estados:', error);
      }
    );
  }

  getCities() {
    this.cityService.getCities().subscribe((city: CityModel[]) => {
      this.cities = city;
    });
  }

  changedCities(stateName: string) {
    if (stateName) {
      this.getCitiesByNameState(stateName);
    }
  }

  getCitiesByNameState(stateName: string) {
    this.cityService.getCityByNameState(stateName).subscribe((city: CityModel[]) => {
      this.cities = city;
    });
  }

  saveClient(form: NgForm) {
    // Obter cidade selecionada
    const selectedCityName = form.value.city;

    // Encontrar a cidade selecionada no array de cidades
    const selectedCity = this.cities.find(city => city.name === selectedCityName);

    // Verificar se a cidade foi encontrada
    if (!selectedCity) {
      console.error('Cidade não encontrada');
      return; // Encerrar a função se a cidade não foi encontrada
    }

    this.address.city = selectedCity;
    this.client.address = this.address
    this.client.car = this.car;
    this.clientService.saveClient(this.client).subscribe(
      (response: any) => {
        alert(this.rn = 'Olá ' + response.name + '. Foi enviado um email com as instruções para o endereço ' + response.email);
        this.cleanForm(form);
      })
  }

  cleanForm(form: NgForm) {
    // this.getProfessionals();
    form.resetForm();
    this.client = {} as ClientModel;
    this.car = {} as CarModel;
    this.address = {} as AddressModel;
  }
  title = 'register-client'
}
