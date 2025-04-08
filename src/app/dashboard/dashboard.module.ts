import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StudentDashboardModule } from '../students/student-dashboard.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { StudentDashboardComponent } from '../students/components/student-dashboard/student-dashboard.component';
import { StudentAddComponent } from '../students/components/student-add/student-add.component';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    StudentDashboardModule,
    StudentDashboardComponent,
    StudentAddComponent,
    DashboardComponent
  ],
  exports: [
    SharedModule,
    StudentDashboardModule,
    DashboardRoutingModule,
    // DashboardComponent,
  ]
})
export class DashboardModule {}
