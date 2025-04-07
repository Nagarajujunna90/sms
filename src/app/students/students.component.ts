import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // ✅ Import RouterModule

@Component({
  selector: 'app-students',
  standalone: true,  // ✅ Required for standalone components
  imports: [RouterModule] , // ✅ Import RouterModule
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

}
