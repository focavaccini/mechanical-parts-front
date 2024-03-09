export class ProductModel{
    id!: number;
    name!: string;
    value!: number;
    quantityTotal!: number;
    identifyCode!: string;
    selected: boolean = false;
    quantity: number = 0;
}