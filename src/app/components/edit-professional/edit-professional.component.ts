import { Component, Injectable } from '@angular/core';
import { ProfessionalModel } from 'src/app/models/ProfessionalModel';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { ApiResponseDialogComponent } from 'src/app/components/api-response-dialog/api-response-dialog.component';

@Component({
  selector: 'app-edit-professional',
  templateUrl: './edit-professional.component.html',
  styleUrls: ['./edit-professional.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class EditProfessionalComponent {

  responseReturn!: string;

  apiStatus!: number;
  professional = {} as ProfessionalModel;
  professionals!: ProfessionalModel[];
  professionalId!: number;
  professionalData: ProfessionalModel = {} as ProfessionalModel;

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
          (professionalData) => {
            this.professionalData = professionalData;
          },
          (error) => {
            console.error('Erro ao buscar dados:', error);
          }
        );
      });
    }

    updateProfessional() {
      if (this.professional.id !== undefined) {
        this.professionalService.updateProfessional(this.professional).subscribe(() => {
        });
      }
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
