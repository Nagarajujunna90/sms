import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent }, // Default page inside Dashboard
    { path: 'students', loadChildren: () => import('../students/student-dashboard.module').then(m => m.StudentDashboardModule) },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }
  