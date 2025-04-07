import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StudentModule } from '../students/student.module';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    StudentModule,
    DashboardComponent
  ],
  exports: [
    SharedModule,
    DashboardRoutingModule,
    DashboardComponent,
    StudentModule,
    RouterModule
  ]
})
export class DashboardModule {}
