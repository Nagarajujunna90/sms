import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreviousEducationDetails } from '../../models/previous-ecucation.model';
import { SharedModule } from '../../../shared/shared.module';
import { StudentDataService } from '../../services/student-data.service';
import { StudentService } from '../../services/student.service';


@Component({
  selector: 'app-student-previous-education',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-previous-education.component.html',
  styleUrls: ['./student-previous-education.component.css']
})
export class StudentPreviousEducationComponent implements OnInit {

  previousEducations: PreviousEducationDetails[] = [];
  studentId: number = 0;

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private studentDataService: StudentDataService
  ) {}
  academicYears: string[] = [];
  selectedYear: string = '';

  ngOnInit(): void {
    this.studentDataService.getStudentId$().subscribe(id => {
      if(id){
      this.studentId = id;
      this.addNewEntry(); // Add at least one entry on load
    }
    });
    const currentYear = new Date().getFullYear();
    const range = 5; // generate 5 years (past, current, future)

    for (let i = currentYear - 2; i <= currentYear + 2; i++) {
      this.academicYears.push(`${i}-${i + 1}`);
    }
  }

  addNewEntry(): void {
    this.previousEducations.push({
      schoolName: '',
      board: '',
      grade: '',
      percentage: 0,
      studentId: this.studentId,
      section: '',
      rollNumber: '',
      medium: '',
      studentStatus: '',
      schoolAddress: '',
      marks: 0,
      totalMarks:0,
      academicYear: ''
    });
  }

  removeEntry(index: number): void {
    this.previousEducations.splice(index, 1);
  }

  calculatePercentage(entry: PreviousEducationDetails): void {
    if (entry.totalMarks > 0) {
      entry.percentage = +(entry.marks / entry.totalMarks * 100).toFixed(2);
    } else {
      entry.percentage = 0;
    }
  }

  savePreviousEducation(): void {
    const previousEducationRequest=this.previousEducations[0];
    this.studentService.savePreviousEducation(previousEducationRequest).subscribe({
      next: () => this.showMessage('Previous education saved!', 'success'),
      error: () => this.showMessage('Failed to save previous education.', 'error')
    });
  }

  showMessage(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
}
