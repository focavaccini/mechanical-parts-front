import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, EMPTY, Observable, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable()
export class CostumeInterceptor implements HttpInterceptor {

  constructor(private router: Router, private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token')?.replace(/\"/g, "");
    const refreshToken = localStorage.getItem('refreshToken');
    const tokenDurationTime = localStorage.getItem('tokenDurationTime')?.replace(/\"/g, "") ?? '0';
    
    if (token && refreshToken && !this.router.url.endsWith('/login')) {
      const currentTime = new Date().getTime();
      const expirationTime = Date.parse(tokenDurationTime);

      if (currentTime > expirationTime) {
        // O token expirou, então tente atualizar com o refresh token
        return this.loginService.refreshToken().pipe(
          switchMap((response) => {
            // Armazene o novo token e o novo refresh token
            localStorage.setItem('token', response.token);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('tokenDurationTime', response.expiredAt);

            // Clone a requisição original com o novo token
            const clonedRequest = request.clone({
              setHeaders: {
                Authorization: `Bearer ${response.token}`
              }
            });

            // Reenvia a requisição original com o novo token
            return next.handle(clonedRequest);
          }),
          catchError((error: HttpErrorResponse) => {
            // Se o refresh token falhar, redireciona para o login
            this.router.navigateByUrl('/login');
            return EMPTY;
          })
        );
      } else {
        // Se o token ainda for válido, apenas anexa o token na requisição
        const clonedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(clonedRequest);
      }
    } else {
      return next.handle(request);
    }
  }
}
