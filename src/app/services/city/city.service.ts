import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { CityModel } from '../../models/CityModel';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  url = 'http://localhost:8080/city'

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //Obtem todas as cidades
  getCities(): Observable<CityModel[]> {
    return this.httpClient.get<CityModel[]>(this.url)
      .pipe(retry(2),
        catchError(this.handleError)
      )
  }

  //Obtem a cidade pelo id
  getCityById(id: number): Observable<CityModel> {
    return this.httpClient.get<CityModel>(this.url + '/' + id)
      .pipe(retry(2),
        catchError(this.handleError)
      )
  }

  //Obtem as cidades a partir do estado
  getCityByNameState(nameState: string): Observable<CityModel[]> {
    console.log('Entrou método de busca:' + nameState)
    return this.httpClient.get<CityModel[]>(this.url + '/state/' + nameState)
      .pipe(retry(2),
        catchError(this.handleError)
      )
  }
//   // salva um profissional
//   saveState(state: StateModel): Observable<StateModel> {
//     return this.httpClient.post<StateModel>(this.url, JSON.stringify(state), this.httpOptions)
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }

//   // utualiza um carro
//   updateState(State: StateModel): Observable<StateModel> {
//     return this.httpClient.put<StateModel>(this.url + '/' + State.id, JSON.stringify(State), this.httpOptions)
//       .pipe(
//         retry(1),
//         catchError(this.handleError)
//       )
//   }

//   // deleta um carro
//   deleteState(State: StateModel) {
//     return this.httpClient.delete<StateModel>(this.url + '/' + State.id, this.httpOptions)
//       .pipe(
//         retry(1),
//         catchError(this.handleError)
//       )
//   }

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
