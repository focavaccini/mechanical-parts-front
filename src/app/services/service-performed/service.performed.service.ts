import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { ServicePerformedModel } from 'src/app/models/ServicePerformedModel';
import { ServicePerformedPaymentModel } from 'src/app/models/ServicePerformedModelPayment';

@Injectable({
  providedIn: 'root'
})
export class ServicePerformedService {

  url = 'http://localhost:8080/service-performed'

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getServicePerformeds(): Observable<ServicePerformedModel[]> {
    return this.httpClient.get<ServicePerformedModel[]>(this.url)
      .pipe(retry(2),
        catchError(this.handleError)
      )
  }

  getServicePerformedById(id: number): Observable<ServicePerformedModel> {
    return this.httpClient.get<ServicePerformedModel>(this.url + '/' + id)
      .pipe(retry(2),
        catchError(this.handleError)
      )
  }

  saveServicePerformed(servicePerformed: ServicePerformedModel): Observable<ServicePerformedModel> {
    return this.httpClient.post<ServicePerformedModel>(this.url, JSON.stringify(servicePerformed), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  savePaymentServicePerformed(servicePerformed: ServicePerformedPaymentModel): Observable<ServicePerformedModel> {
    return this.httpClient.post<ServicePerformedModel>(this.url + '/pay-service/' + servicePerformed.id, JSON.stringify(servicePerformed), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateServicePerformed(servicePerformed: any): Observable<ServicePerformedModel> {
    return this.httpClient.put<ServicePerformedModel>(this.url + '/' + servicePerformed.id, JSON.stringify(servicePerformed), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  
  deleteServicePerformed(servicePerformed: ServicePerformedModel) {
    return this.httpClient.delete<ServicePerformedModel>(this.url + '/' + servicePerformed.id, this.httpOptions)
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
      errorMessage = error.error.message;
    }
    return throwError(errorMessage)
  }
}
