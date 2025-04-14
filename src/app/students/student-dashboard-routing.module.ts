import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentDeleteComponent } from './components/student-delete/student-delete.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { ViewStudentsComponent } from './components/view-students/view-students.component';
import { StudentViewEditComponent } from './components/student-view-edit/student-view-edit.component';
import { AuthGuard } from '../auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: StudentDashboardComponent,
    children: [
      //  { path: '', redirectTo: 'add', pathMatch: 'full' },
      { path: 'list', component: ViewStudentsComponent },
      { path: 'edit/:id', component: StudentViewEditComponent, canActivate: [AuthGuard] },
      { path: 'delete/:id', component: StudentDeleteComponent },
      {
        path: 'update/:id',
        loadChildren: () => import('./components/student-add/student-add.module').then(m => m.StudentAddModule)
            },
      // {
      //   path: 'add/personal-info',
      //   loadChildren: () => import('./components/student-add/student-add.module').then(m => m.StudentAddModule)
      // } ,
      {
        path: 'add',
        loadChildren: () => import('./components/student-add/student-add.module').then(m => m.StudentAddModule)
      }
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsDashboardRoutingModule { }
