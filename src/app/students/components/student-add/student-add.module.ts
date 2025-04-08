import { NgModule } from '@angular/core';
import { StudentsAddRoutingModule } from './student-add-routing.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    StudentsAddRoutingModule
    
  ],
  exports: [
    SharedModule,
    StudentsAddRoutingModule
  ]
})
export class StudentAddModule{
    
}