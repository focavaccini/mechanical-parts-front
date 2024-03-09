import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { CarModel } from '../../models/CarModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  url = 'http://localhost:8080/client-car'

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //Obtem todos os carros
  getCars(): Observable<CarModel[]> {
    return this.httpClient.get<CarModel[]>(this.url)
      .pipe(retry(2),
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
      errorMessage = error.error.message;
    }
    return throwError(errorMessage)
  }
}
