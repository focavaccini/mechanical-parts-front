import { CarModel } from "./CarModel";
import { ProductModel } from "./ProductModel";
import { ProfessionalModel } from "./ProfessionalModel";

export class ServicePerformedModel {
    id!: number;
    description!: string;
    observation!: string;
    problemReported!: string;
    deliveryDate!: string;
    usedProducts!: ProductModel[];
    quantityUsed!: number;
    laborCost!: number;
    totalValue!: number;
    professional!: any;
    daysForDelivery!: number;
    status!: string;
    car!: any;
    selectedProducts!: ProductModel[];
}