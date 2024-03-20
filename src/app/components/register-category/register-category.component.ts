import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { CategoryService } from 'src/app/services/category/category.service';
import { ApiResponseDialogComponent } from '../api-response-dialog/api-response-dialog.component';

@Component({
  selector: 'app-register-category',
  templateUrl: './register-category.component.html',
  styleUrls: ['./register-category.component.css']
})
export class RegisterCategoryComponent {

  category = {} as CategoryModel;
  categories!: CategoryModel[];

  constructor(private categoryService: CategoryService, private dialog: MatDialog) { }

  ngOnInit() {
    
  }

  saveCategory(form: NgForm) {

    this.categoryService.saveCategory(this.category).subscribe(
      (response: any) => {
        this.openDialog('Categoria cadastrada com sucesso')
        this.cleanForm(form);
      },
      (error) => {
        this.openDialog('Erro ao tentar cadastrar categoria' + error);
      });

  }

  deleteCategory(category: CategoryModel) {
    this.categoryService.deleteCategory(category).subscribe(() => {
    });
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.category = {} as CategoryModel;
  }

  openDialog(apiResponse: string): void {
    const dialogRef = this.dialog.open(ApiResponseDialogComponent, {
      width: '300px',
      data: apiResponse,
    });
  }
  
  title = 'register-category';
}
