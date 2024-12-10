import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductModel } from 'src/app/models/ProductModel';
import { ApiResponseDialogComponent } from '../api-response-dialog/api-response-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  standalone: true,
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class EditProductComponent  implements OnInit {

  categories: CategoryModel[] = [];

  apiStatus!: number;
  product = {} as ProductModel;
  products!: ProductModel[];
  productId!: number;
  productData: ProductModel = {} as ProductModel;

  productForm = new FormGroup({

    id: new FormControl(0),
    name: new FormControl(''),
    value: new FormControl(0),
    identifyCode: new FormControl(''),

    categoryId: new FormControl(0),
    categoryName: new FormControl(''),
    categoryCode: new FormControl(''),

   })

   constructor(
    private productService: ProductService,
    private categorieService: CategoryService,
    private dialog: MatDialog, 
    private route: ActivatedRoute){}

  ngOnInit() {
    this.getProduct()
    this.getCategories()
  }

  getCategories() {
    this.categorieService.getCategories().subscribe((category: CategoryModel[]) =>{
      this.categories = category;
    });
  }

  getProduct() {
    this.route.params.subscribe(params => {
      this.productService.getProductById(params['id']).subscribe(
        {next: (values) => {
          this.productForm.patchValue({
            id: values.id,
            name: values.name,
            value: values.value,
            identifyCode: values.identifyCode,
            categoryId: values.category.id,
            categoryCode: values.category.code,
            categoryName: values.category.name
          });
        }}
      );
    });
  }

  updateProduct() {
    console.log('CHAMOU')
    const productData: ProductModel = {
      id: this.productForm.get('id')?.value ?? 0,
      name: this.productForm.get('name')?.value ?? '',
      value: this.productForm.get('value')?.value ?? 0,
      identifyCode: this.productForm.get('identifyCode')?.value ?? '',
      quantityTotal: 0,
      selected: false,
      quantityUsed: 0,
      category: {
        id: this.productForm.get('categoryId')?.value ?? 0,
        code: this.productForm.get('categoryCode')?.value ?? '',
        name: this.productForm.get('categoryName')?.value ?? '',
      }
    }

      this.productService.updateProduct(productData).subscribe(
       (result) => {
        alert('Produto atualizado com Sucesso');
      },
      error => {
        console.log(error)
        alert('Erro ao tentar atualizar dados do produto: ' + error);
      });
    
  }

  cleanForm(form: NgForm){
    form.resetForm();
    this.product = {} as ProductModel;
  }

  openDialog(apiResponse: string): void {
    const dialogRef = this.dialog.open(ApiResponseDialogComponent, {
      width: '300px',
      data: apiResponse,
    });
  }
  title = 'update-product';

}
