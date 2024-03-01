import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { ClientModel } from '../../models/ClientModel';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = 'http://localhost:8080/client'

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //Obtem todos os clients
  getClients(): Observable<ClientModel[]> {
    return this.httpClient.get<ClientModel[]>(this.url + '/' + 'listAll')
      .pipe(retry(2),
        catchError(this.handleError)
      )
  }

  //Obtem o client pelo id
  getClientById(id: number): Observable<ClientModel> {
    return this.httpClient.get<ClientModel>(this.url + '/' + id)
      .pipe(retry(2),
        catchError(this.handleError)
      )
  }

  // salva um client
  saveClient(client: ClientModel): Observable<ClientModel> {
    return this.httpClient.post<ClientModel>(this.url, JSON.stringify(client), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um carro
  updateClient(client: ClientModel): Observable<ClientModel> {
    return this.httpClient.put<ClientModel>(this.url + '/' + client.id, JSON.stringify(client), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um carro
  deleteClient(client: ClientModel) {
    return this.httpClient.delete<ClientModel>(this.url + '/' + client.id, this.httpOptions)
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
