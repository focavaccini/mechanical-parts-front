import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/ProductModel';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  standalone: true,
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  imports: [NgForOf]
})
export class ListProductsComponent implements OnInit {
  product = {} as ProductModel;
  products!: ProductModel[];
  productForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    identifyCode: new FormControl(''),
    quantityTotal: new FormControl(0),
    value: new FormControl(0),
  })

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ){};

  ngOnInit(): void {
    this.getProducts(); 
  }

  getProducts() {
    console.log('Entrou get product');
    this.productService.getProducts().subscribe((products: ProductModel[]) => {
      this.products = products;
      console.log(this.products);
    });
  }

  editProduct(id: number) {
    if(id) {
      this.router.navigate(['/edit-product', id])
    } else {
      alert('Produto não encontrado')
    }
  }

  title = 'list-product';

}
