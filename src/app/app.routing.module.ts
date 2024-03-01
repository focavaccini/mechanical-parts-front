import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListProfessionalComponent } from './components/list-professional/list-professional.component';
import { RegisterProfessionalComponent } from './components/register-professional/register-professional.component';
import { EditProfessionalComponent } from './components/edit-professional/edit-professional.component';
import { ListClientComponent } from './components/list-client/list-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'list-professional', component: ListProfessionalComponent },
            { path: 'register-professional', component: RegisterProfessionalComponent },
            { path: 'edit-professional/:id', component: EditProfessionalComponent },
            { path: 'list-client', component: ListClientComponent },
            { path: 'edit-client/:id', component: EditClientComponent },
        ]
    },
    {
        path:'**',
        component:LoginComponent
    }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes), CommonModule,],
    exports: [RouterModule]
})
export class AppRoutingModule { }