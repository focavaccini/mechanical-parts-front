import { CarModel } from "./CarModel";
import { ProfessionalModel } from "./ProfessionalModel";

export class ServicePerformedModel {
    id!: number;
    description!: string;
    observation!: string;
    problemReported!: string;
    serviceDays!: number;
    usedProducts!: string;
    laborCost!: number;
    totalValue!: number;
    professional!: ProfessionalModel;
    car!: CarModel;
}