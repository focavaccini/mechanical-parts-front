import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductModel } from 'src/app/models/ProductModel';
import { NgForm, NgModel } from '@angular/forms';
import { ProductImageModel } from 'src/app/models/ProductImage';
import { MatDialog } from '@angular/material/dialog';
import { ApiResponseDialogComponent } from '../api-response-dialog/api-response-dialog.component';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent {

  product = {} as ProductModel;
  productImage = {} as ProductImageModel;
  category = {} as CategoryModel;
  categories: CategoryModel[] = [];

  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService,
    private dialog: MatDialog) 
  { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((category: CategoryModel[]) => {
      this.categories = category;
      if (this.categories.length > 0) {
        this.category = this.categories[0]; 
      }
    });
  }

  saveProduct(form: NgForm) {

    const selectedCategoryName = form.value.category;
    const selectedCategory = this.categories.find(category => category.name === selectedCategoryName);
    
    if (!selectedCategory) {
      this.openDialog('Categoria não encontrada');
      return; // Encerrar a função se a cidade não foi encontrada
    }
    
    this.product.category = selectedCategory

    this.productService.saveProduct(this.product).subscribe(
      (response: any) => {

        const formData = new FormData();
        formData.append('file', this.productImage.file, this.productImage.file.name);
        this.productService.insertImage(formData, response.id).subscribe(
          (response: any) => {
            alert('Produto salvo com sucesso');
          })
        this.cleanForm(form);

      },
      (error) => {
        this.openDialog('Erro ao tentar cadastrar produto' + error);
      }
    )
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const allowedTypes = ['image/jpg', 'image/jpeg','image/png']

      if (file && allowedTypes.includes(file.type)) {
        this.productImage.file = file;
      } else {
        this.openDialog('Tipo de arquivo inválido. Apenas imagens JPG, PNG são permitidas.')
        this.productImage.file = null
        event.target.value = null;
      }
    }
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.product = {} as ProductModel;
  }

  openDialog(apiResponse: string): void {
    const dialogRef = this.dialog.open(ApiResponseDialogComponent, {
      width: '300px',
      data: apiResponse,
    });
  }

  title = 'register-product'
}
