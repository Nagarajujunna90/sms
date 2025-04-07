import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StudentsRoutingModule } from './student-routing.module'; // ✅ Import StudentRoutingModule
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentDeleteComponent } from './student-delete/student-delete.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    StudentsRoutingModule,
    StudentAddComponent,
    StudentEditComponent,
    StudentDeleteComponent,
    StudentListComponent
  ],
  exports: [
    SharedModule,
    StudentsRoutingModule,
    StudentAddComponent,
    StudentEditComponent,
    StudentDeleteComponent,
    RouterModule
  ]
})
export class StudentsModule {}
