import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    DashboardComponent
  ],
  exports: [
    SharedModule,
    DashboardRoutingModule,
    DashboardComponent,
    RouterModule
  ]
})
export class DashboardModule {}
