import { Component, OnInit } from '@angular/core';
import { ProfessionalModel } from 'src/app/models/ProfessionalModel';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-list-professional',
  templateUrl: './list-professional.component.html',
  styleUrls: ['./list-professional.component.css'],
  imports: [ReactiveFormsModule, NgForOf]
})

export class ListProfessionalComponent implements OnInit{
    professional = {} as ProfessionalModel;
    professionals!: ProfessionalModel[];
    professionalForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
    })
  constructor(
    private professionalService: ProfessionalService, 
    private router: Router, 
    private route: ActivatedRoute){}

  ngOnInit() {
    this.getProfessionals();
  }

  getProfessionals(){
    this.professionalService.getProfessionals().subscribe((professionals: ProfessionalModel[])  =>{
      this.professionals = professionals;
    })
  }

  editProfessional(id: number) {
      if(id){
        this.router.navigate(['/edit-professional/', id]);
      } else {
      }
  }

  irParaComponenteDestino() {
    console.log('CHAMOU')
  }

  cleanForm(form: NgForm){
    this.getProfessionals();
    form.resetForm();
    this.professional = {} as ProfessionalModel;
  }

  title = 'list-professional';
}


// import { Component, OnInit, Injectable } from '@angular/core';
// import { Professional } from 'src/app/models/professional';
// import { ProfessionalService } from 'src/app/services/professional.service';
// import { NgForm } from '@angular/forms';

// @Component({
//   selector: 'app-list-professional',
//   templateUrl: '/src/app/components/list-professional/list-professional.component.html',
//   styleUrls: ['/src/app/components/list-professional/list-professional.component.css']
// })

// @Injectable({
//   providedIn: 'root',
// })

// export class ListProfessionalComponent {

//   professional = {} as Professional;
//   professionals!: Professional[];

//   constructor(private professionalService: ProfessionalService){}

//   ngOnInit() {
//     this.getProfessionals();
//   }

//   getProfessionals(){
//     this.professionalService.getProfessionals().subscribe((professionals: Professional[])  =>{
//       this.professionals = professionals;
//     })
//   }

//   cleanForm(form: NgForm){
//     this.getProfessionals();
//     form.resetForm();
//     this.professional = {} as Professional;
//   }

//   title = 'list-professional';

// }
