import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentsRoutingModule } from './student-routing.module'; 
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentDeleteComponent } from './student-delete/student-delete.component';
import { SharedModule } from '../shared/shared.module';
import { StudentPreviousEducationComponent } from './student-previous-education/student-previous-education.component';
import { StudentComponent } from './student.component';
import { StudentsAddRoutingModule } from './student-add/student-add-routing.module';

@NgModule({
  imports: [
    SharedModule,
    StudentsRoutingModule,
    StudentComponent
  ],
  exports: [
    SharedModule,
    StudentsRoutingModule,
    RouterModule,
  ]
})
export class StudentModule {}
