import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentsDashboardRoutingModule } from './student-dashboard-routing.module'; 
import { SharedModule } from '../shared/shared.module';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentAddModule } from './components/student-add/student-add.module';

@NgModule({
  imports: [
    StudentsDashboardRoutingModule,
    StudentAddModule,
    StudentDashboardComponent,
  ],
  exports: [
    StudentsDashboardRoutingModule,
    StudentAddModule,
    StudentDashboardComponent
  ]
})
export class StudentDashboardModule {}
