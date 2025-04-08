import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app/app.routes';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/services/auth.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthInterceptor } from './auth/components/login/auth.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    DashboardModule
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
