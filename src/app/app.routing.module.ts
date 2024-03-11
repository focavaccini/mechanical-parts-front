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
import { ListProductsComponent } from './components/list-products/list-products.component';
import { RegisterProductComponent } from './components/register-product/register-product.component';
import { RegisterClientComponent } from './components/register-client/register-client.component';
import { RegisterServicePerformedComponent } from './components/register-service-performed/register-service-performed.component';
import { ListServicePerformedComponent } from './components/list-service-performed/list-service-performed.component';
import { ViewServicePerformedComponent } from './components/view-service-performed/view-service-performed.component';
import { EditServicePerformedComponent } from './components/edit-service-performed/edit-service-performed.component';

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
            { path: 'list-service-performed', component: ListServicePerformedComponent },
            { path: 'edit-client/:id', component: EditClientComponent },
            { path: 'list-product', component: ListProductsComponent },
            { path: 'register-product', component: RegisterProductComponent },
            { path: 'register-client', component: RegisterClientComponent },
            { path: 'register-service-performed', component: RegisterServicePerformedComponent },
            { path: 'view-service-performed/:id', component: ViewServicePerformedComponent },
            { path: 'edit-service-performed/:id', component: EditServicePerformedComponent }
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