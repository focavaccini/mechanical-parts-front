import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductModel } from 'src/app/models/ProductModel';
import { NgForm, NgModel } from '@angular/forms';
import { ProductImageModel } from 'src/app/models/ProductImage';
import { MatDialog } from '@angular/material/dialog';
import { ApiResponseDialogComponent } from '../api-response-dialog/api-response-dialog.component';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent {

  product = {} as ProductModel;
  productImage = {} as ProductImageModel;
  fileError: string = '';

  constructor(private productService: ProductService, private dialog: MatDialog) { }

  saveProduct(form: NgForm) {
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
      const allowedTypes = ['image/jpg', 'image/png']

      if (file && allowedTypes.includes(file.type)) {
        this.productImage.file = file;
        this.fileError = '';
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
