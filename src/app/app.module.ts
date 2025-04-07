import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app/app.routes';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { StudentsModule } from './students/students.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
   // MaterialModule,
    HttpClientModule,
    StudentsModule,
    DashboardModule,
    AppRoutingModule,
    LoginComponent,
  ],
  providers: [
    AuthService,
     AuthGuard,
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
  bootstrap: [
  ]
})
export class AppModule {}
