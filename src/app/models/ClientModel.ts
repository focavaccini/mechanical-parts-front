import { CarModel } from "./CarModel";
import { AddressModel } from "./AddressModel";
export class ClientModel {
    id!: number;
    name!: string;
    email!: string;
    phone!: string;
    cpf!: string;
    sexo!: string;
    birthdate!: string;
    address!: any;
    car!: any;
    // outras propriedades do usuário
}