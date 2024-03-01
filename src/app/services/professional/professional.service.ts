import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { ProfessionalModel } from '../../models/ProfessionalModel';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {

  url = 'http://localhost:8080/professional'

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //Obtem todos os profissionais
  getProfessionals(): Observable<ProfessionalModel[]> {
    return this.httpClient.get<ProfessionalModel[]>(this.url + '/' + 'listAll')
      .pipe(retry(2),
        catchError(this.handleError)
      )
  }

  //Obtem o profissional pelo id
  getProfessionalById(id: number): Observable<ProfessionalModel> {
    return this.httpClient.get<ProfessionalModel>(this.url + '/' + id)
      .pipe(retry(2),
        catchError(this.handleError)
      )
  }

  // salva um profissional
  saveProfessional(professional: ProfessionalModel): Observable<ProfessionalModel> {
    return this.httpClient.post<ProfessionalModel>(this.url, JSON.stringify(professional), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um carro
  updateProfessional(professional: ProfessionalModel): Observable<ProfessionalModel> {
    return this.httpClient.put<ProfessionalModel>(this.url + '/' + professional.id, JSON.stringify(professional), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um carro
  deleteProfessional(professional: ProfessionalModel) {
    return this.httpClient.delete<ProfessionalModel>(this.url + '/' + professional.id, this.httpOptions)
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
