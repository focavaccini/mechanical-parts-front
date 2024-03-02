
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiResponseDialogComponent } from 'src/app/components/api-response-dialog/api-response-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterProfessionalComponent } from './components/register-professional/register-professional.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditProfessionalComponent } from './components/edit-professional/edit-professional.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CostumeInterceptor } from './services/interceptors/costume.interceptor';
import { RegisterProductComponent } from './components/register-product/register-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ApiResponseDialogComponent,
    RegisterProfessionalComponent,
    EditProfessionalComponent,
    HomePageComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    RegisterProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    CarouselModule,
    
  ],
  providers: [
    AppRoutingModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CostumeInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
