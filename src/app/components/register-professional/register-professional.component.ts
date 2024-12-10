import { Component, OnInit, Injectable } from '@angular/core';
import { ProfessionalModel } from 'src/app/models/ProfessionalModel';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiResponseDialogComponent } from 'src/app/components/api-response-dialog/api-response-dialog.component';

@Component({
  selector: 'app-register-professional',
  templateUrl: './register-professional.component.html',
  styleUrls: ['./register-professional.component.css']
})

export class RegisterProfessionalComponent {

    responseReturn: string | undefined;
    rn: string | undefined;
    apiStatus: number | undefined;
    professional = {} as ProfessionalModel;
    professionals!: ProfessionalModel[];

      constructor(private professionalService: ProfessionalService,  private dialog: MatDialog){}

      ngOnInit() {
        this.rn;
      }

  saveProfessional(form: NgForm) {

    if (this.professional.id !== undefined) {
      this.professionalService.updateProfessional(this.professional).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.professionalService.saveProfessional(this.professional).subscribe(
        (response: any) => {
          this.responseReturn = response;
          alert(this.rn = 'Olá ' + response.name +'. Foi enviado um email com as instruções para o endereço ' + response.email);
        this.cleanForm(form);
      }, error => {
        debugger
        console.log(error)
        alert('Erro ao tentar cadastrar dados do profissional: ' + error);
      });
    }
  }

    deleteProfessional(professional: ProfessionalModel) {
      this.professionalService.deleteProfessional(professional).subscribe(() => {
      });
    }
  
    editProfessional(professional: ProfessionalModel) {
      this.professional = { ...professional };
    }

  cleanForm(form: NgForm){
    form.resetForm();
    this.professional = {} as ProfessionalModel;
  }
  
  openDialog(apiResponse: string): void {
    const dialogRef = this.dialog.open(ApiResponseDialogComponent, {
      width: '300px',
      data: apiResponse,
    });
  }
  title = 'register-professional';
}