import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { StateModel } from '../../models/StateModel';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  url = 'http://localhost:8080/state'

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //Obtem todos os estados
  getStates(): Observable<StateModel[]> {
    return this.httpClient.get<StateModel[]>(this.url)
      .pipe(retry(2),
        catchError(this.handleError)
      )
  }

  //Obtem o estado pelo id
  getStateById(id: number): Observable<StateModel> {
    return this.httpClient.get<StateModel>(this.url + '/' + id)
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
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage)
  }
}
