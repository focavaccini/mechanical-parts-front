import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiResponseDialogComponent } from '../api-response-dialog/api-response-dialog.component';
import { LoginModel } from 'src/app/models/LoginModel';
import { LoginService } from 'src/app/services/login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  // standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {}

  login = {} as LoginModel;

  constructor(private loginService: LoginService,  private dialog: MatDialog, private router: Router){}

  requestLogin(form: NgForm) {

    if (this.login.login !== undefined && this.login.password !== undefined) {
      this.loginService.login(this.login).subscribe(
        (response) => {
          const token = response.token;
          if(token != null) {
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('user', JSON.stringify(this.login));
            localStorage.setItem('tokenDurationTime', JSON.stringify(response.expiredAt));
            this.router.navigateByUrl('/list-professional');
          } else {
            this.openDialog("Usuário Inválido!")
          }
        },
        (error) => {
          this.openDialog("Usuário/Senha Inválido!");
        }
      );
    };
  }

  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  deslogar(isTrue: boolean) {
    localStorage.clear();
    this.router.navigate(['login']);
}

  cleanForm(form: NgForm){
    form.resetForm();
    this.login = {} as LoginModel;
  }

  openDialog(apiResponse: string): void {
    const dialogRef = this.dialog.open(ApiResponseDialogComponent, {
      width: '300px',
      data: apiResponse,
    });
  }
  
  title = 'request-login';
}
