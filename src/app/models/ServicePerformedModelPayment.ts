import { ServicePerformedModel } from "./ServicePerformedModel";

export class ServicePerformedPaymentModel {
    id!: number;
    paymentForm!: string;;
    totalValuePaied!: number;
    installments!: number;
    servicePerformed!: ServicePerformedModel;
}