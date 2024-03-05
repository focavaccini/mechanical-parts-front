import { CityModel } from "./CityModel";

export class AddressModel {
    id!: number;
    city!: CityModel;
    neighborhood!: string;
    number!: string;
    street!: string;
    complement!: string;
    cep!: string;
}