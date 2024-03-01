import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CostumeInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenDurationTime = localStorage.getItem('tokenDurationTime')?.replace(/\"/g, "") ?? '0';
    const token = localStorage.getItem('token')?.replace(/\"/g, "");
    
    if (token && !this.router.url.endsWith('/login')) {  
      const currentTime = new Date().getTime();
      const expirationTime = Date.parse(tokenDurationTime);
      
          if (currentTime > expirationTime) {
            this.router.navigateByUrl('/login');
            return EMPTY
          } else {
              const newCloneRequest = request.clone({
                setHeaders : {
                  Authorization: `Bearer ${token}`
                }
              });

              return next.handle(newCloneRequest);
          }
    } else {
      return next.handle(request);
    }
  }
}
