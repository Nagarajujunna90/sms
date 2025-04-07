import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StudentsAddRoutingModule } from './student-add-routing.module';

@NgModule({
  imports: [
    SharedModule,
    StudentsAddRoutingModule,
    
  ],
  exports: [
    SharedModule,
    StudentsAddRoutingModule
  ]
})
export class StudentAddModule{
    
}