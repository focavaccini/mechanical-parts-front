import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoginModel } from '../../models/LoginModel'

// Defina um tipo para a resposta do serviço de login
interface LoginResponse {
  token: string;
  expiredAt: string;
  // Outras propriedades, se houver
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    url = 'http://localhost:8080/authentication/login'

    constructor(private httpClient: HttpClient) { }
  
    // Headers
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

     // realiza o login
    login(login: LoginModel): Observable<LoginResponse> {
      return this.httpClient.post<LoginResponse>(this.url, JSON.stringify(login), this.httpOptions)
        .pipe(
          retry(2),
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
