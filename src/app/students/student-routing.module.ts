import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentDeleteComponent } from './student-delete/student-delete.component';

const routes: Routes = [
  { 
    path: '', component: StudentsComponent, // Student Dashboard Page
    children: [
      { path: 'list', component: StudentListComponent },  // View students
      { path: 'add', component: StudentAddComponent },    // Add student
      { path: 'edit/:id', component: StudentEditComponent },  // Edit student
      { path: 'delete/:id', component: StudentDeleteComponent }  // Delete student
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
