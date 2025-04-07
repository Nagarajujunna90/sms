import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentDeleteComponent } from './student-delete/student-delete.component';

export const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      //  { path: '', redirectTo: 'add', pathMatch: 'full' },
      { path: 'list', component: StudentListComponent },
      { path: 'edit/:id', component: StudentEditComponent },
      { path: 'delete/:id', component: StudentDeleteComponent },
      { path: 'add',loadChildren: () =>import('./student-add/student-add.module').then(m => m.StudentAddModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
