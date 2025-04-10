import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { Student } from '../../models/student.model';
import { StudentDataService } from '../../services/student-data.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-personal-info',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-personal-info.component.html',
  styleUrl: './student-personal-info.component.css'
})
export class StudentPersonalInfoComponent {
  personalInfo: Student = this.getDefaultStudent();
  studentId: number = 0;

  getDefaultStudent(): Student {
    return {
      studentId: 0,
      userName: 'kiran',
      firstName: 'kumar',
      lastName: 'naga',
      gender: 'Male',
      age: 4,
      dateOfBirth: '01-01-1991',
      mobileNumber: '23123123',
      identityMarks: 'A mole on the left hand',
      profilePicture: '',
      emaild: 'abc@test.com'
    };
  }

  savePersonalInfo() {
    this.studentService.savePersonalInfo(this.personalInfo).subscribe({
      next: response => {
        this.studentId = response.studentId;
        this.studentDataService.setStudentId(this.studentId);
        this.showMessage('Personal Info Saved Successfully!', 'success');
      },
      error: (err) => this.showMessage(err.error?.errorMessage || 'Something went wrong!', 'error')
    });
  }

  showMessage(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  closeAlert() {
    this.successMessage = '';
  }

  closeError() {
    this.errorMessage = '';
  }

  successMessage: string = '';
  errorMessage: string = '';


  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private studentDataService: StudentDataService // Inject here

  ) { }


}
