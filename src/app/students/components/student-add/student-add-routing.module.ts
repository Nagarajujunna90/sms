import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentPersonalInfoComponent } from '../student-personal-info/student-personal-info.component';
import { StudentAddressComponent } from '../student-address/student-address.component';
import { StudentPreviousEducationComponent } from '../student-previous-education/student-previous-education.component';
import { StudentAddComponent } from './student-add.component';
import { StudentAcademicDetailsComponent } from '../student-academic/student-academic.component';

export const routes: Routes = [
  {
    path: '', component: StudentAddComponent,
    children: [
    //  { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
    { path: 'personal-info', component: StudentPersonalInfoComponent },
    { path: 'address', component: StudentAddressComponent },
      { path: 'academic', component: StudentAcademicDetailsComponent },
      { path: 'previous-education', component: StudentPreviousEducationComponent }

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsAddRoutingModule {}