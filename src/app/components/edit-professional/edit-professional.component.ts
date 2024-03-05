import { Component, Injectable } from '@angular/core';
import { ProfessionalModel } from 'src/app/models/ProfessionalModel';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { ApiResponseDialogComponent } from 'src/app/components/api-response-dialog/api-response-dialog.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-edit-professional',
  templateUrl: './edit-professional.component.html',
  styleUrls: ['./edit-professional.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})

export class EditProfessionalComponent {

  responseReturn!: string;

  apiStatus!: number;
  professional = {} as ProfessionalModel;
  professionals!: ProfessionalModel[];
  professionalId!: number;
  professionalData: ProfessionalModel = {} as ProfessionalModel;

  professionalForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    code: new FormControl(''),
   })

    constructor(
      private professionalService: ProfessionalService, 
      private dialog: MatDialog, 
      private route: ActivatedRoute){}

    ngOnInit() {
      this.getProfessional();
    }

    getProfessional() {
      this.route.params.subscribe(params => {
        this.professionalService.getProfessionalById(params['id']).subscribe(
          {next: (value) => {
            this.professionalForm.patchValue({
              id: value.id,
              name: value.name,
              phone: value.phone,
              email: value.email,
              code: value.code
            });
          }}
          // (professionalData) => {
          //   this.professionalData = professionalData;
          // },
          // (error) => {
          //   console.error('Erro ao buscar dados:', error);
          // }
        );
      });
    }

    updateProfessional() {
      const professionalData: ProfessionalModel = {
        id: this.professionalForm.get('id')?.value ?? 0,
        name: this.professionalForm.get('name')?.value ?? '',
        email: this.professionalForm.get('email')?.value ?? '',
        phone: this.professionalForm.get('phone')?.value ?? '',
        code: this.professionalForm.get('code')?.value ?? ''
        }
 
        this.professionalService.updateProfessional(professionalData).subscribe(
         (result) => {
          alert('Profissional atualizado com Sucesso');
        },
        error => {
          console.log(error)
          alert('Erro ao tentar atualizar dados do profissional: ' + error);
        });
      
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
    title = 'update-professional';
}
