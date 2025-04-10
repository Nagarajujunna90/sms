import { Component } from '@angular/core';
import { ParentGuardian } from '../../models/studentResponse.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentDataService } from '../../services/student-data.service';
import { StudentService } from '../../services/student.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-student-parent-gardian',
  imports: [SharedModule],
  templateUrl: './student-parent-gardian.component.html',
  styleUrl: './student-parent-gardian.component.css'
})
export class StudentParentGardianComponent {
  constructor(private studentService: StudentService, private snackBar: MatSnackBar, private studentDataService: StudentDataService) { }

  studentParentGuardians: ParentGuardian[] = [];
  dataLoaded = false;
  
  ngOnInit(): void {
    this.studentDataService.getStudentId$().subscribe(id => {
      if (id) {
        console.log('Received Student ID:', id);
        this.studentId = id;
      }
    });
    // Simulate API or setup
    setTimeout(() => {
      this.studentParentGuardians = [
        {
          name: '',
          mobileNumber: '',
          occupation: '',
          email: '',
          relationType: 'Father',
          guardianId: 0,
          qualification: '',
          studentId: 0,
          age:0
        }
      ];
      this.dataLoaded = true;
    }, 100); // You can remove timeout if loading real data
  }
  
  addGuardian(): void {
    this.studentParentGuardians.push({
      name: '',
      mobileNumber: '',
      occupation: '',
      email: '',
      relationType: 'Father',
      guardianId: 0,
      qualification: '',
      studentId: 0,
      age:0
    });
  }
  removeGuardian(index: number): void {
    if (this.studentParentGuardians.length > 1) {
      this.studentParentGuardians.splice(index, 1);
    }
  }
  studentId: number = 0;

  saveGuardians() {
    console.log('Saved Guardian Info:', this.studentParentGuardians);

    this.studentParentGuardians[0].studentId = this.studentId;

    console.log(this.studentParentGuardians)
    this.studentService.saveParentInfo(this.studentParentGuardians[0]).subscribe({
      next: response => {
        this.showMessage('Parent/Guardian details Saved Successfully!', 'success')
      },
      error: (err) => this.showMessage(err.error?.errorMessage || 'Failed to save address!', 'error')
    });
  }
  successMessage: string = '';
  errorMessage: string = '';

  showMessage(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
  
}
