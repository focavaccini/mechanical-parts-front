import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { ProductModel } from '../../models/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://localhost:8080/product'

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //Obtem todos os produtos
  getProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.url)
      .pipe(retry(2),
        catchError(this.handleError)
      )
  }

  //Obtem o produto pelo id
  getProductById(id: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(this.url + '/' + id)
      .pipe(retry(2),
        catchError(this.handleError)
      )
  }

  // salva um produto
  saveProduct(product: ProductModel): Observable<ProductModel> {
    return this.httpClient.post<ProductModel>(this.url, JSON.stringify(product), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // atualiza um produto
  updateProduct(product: ProductModel): Observable<ProductModel> {
    return this.httpClient.put<ProductModel>(this.url + '/' + product.id, JSON.stringify(product), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um produto
  deleteProduct(product: ProductModel) {
    return this.httpClient.delete<ProductModel>(this.url + '/' + product.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  //Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //Erro ocorreu do lado do client
      errorMessage = error.error.message;
    } else {
      //Erro ocorreu do lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage)
  }
}
