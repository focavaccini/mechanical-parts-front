import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductModel } from 'src/app/models/ProductModel';
import { NgForm, NgModel } from '@angular/forms';
import { ProductImageModel } from 'src/app/models/ProductImage';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent {

  product = {} as ProductModel;
  productImage = {} as ProductImageModel;

  constructor(private productService: ProductService){}
  
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
      }
    )
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productImage.file = file;
    }
  }

  cleanForm(form: NgForm){
    form.resetForm();
    this.product = {} as ProductModel;
  }

  title = 'register-product'
}
