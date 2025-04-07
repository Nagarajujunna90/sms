import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AcademicDetails } from '../../models/AcademicDetails.model';
import { StudentService } from '../student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentDataService } from '../student-data.service';

@Component({
  selector: 'app-student-academic-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-academic.component.html',
  styleUrls: ['./student-academic.component.css']
})

export class StudentAcademicDetailsComponent {
  constructor(private studentService: StudentService, private snackBar: MatSnackBar,private studentDataService:StudentDataService) { }

  grades = ['1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade'];
  gradeDetails: AcademicDetails = this.getDefaultAcademicDetails();
  getDefaultAcademicDetails(): AcademicDetails {
    return {
      studentId: 0,
      grade: '',
      section: 'A',
      rollNumber: 0,
      studentStatus: 'Active',
      academicYear: ''
    };
  }
  studentId: number = 0;

  saveGrade() {
    this.gradeDetails.studentId = this.studentId;
    console.log(this.gradeDetails)
    this.studentService.saveGradeDetails(this.gradeDetails).subscribe({
      next: () => this.showMessage('Grade Details Saved Successfully!', 'success'),
      error: (err) => this.showMessage(err.error?.errorMessage || 'Failed to save grade details!', 'error')
    });
  }

  academicYears: string[] = [];
  selectedYear: string = '';

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    const range = 5; // generate 5 years (past, current, future)

    for (let i = currentYear - 2; i <= currentYear + 2; i++) {
      this.academicYears.push(`${i}-${i + 1}`);
    }
    this.studentDataService.getStudentId$().subscribe(id => {
      if (id) {
        console.log('Received Student ID:', id);
        this.studentId=id;
      }
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
