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

  ngOnInit(): void {
    this.studentDataService.getStudentId$().subscribe(id => {
      if(id){
      this.studentId = id;
      this.addNewEntry(); // Add at least one entry on load
    }
    });
  }

  addNewEntry(): void {
    this.previousEducations.push({
      institutionName: '',
      board: '',
      classGrade: '',
      marksObtained: 0,
      totalMarks: 0,
      yearOfPassing: '',
      percentage: 0,
      studentId: this.studentId
    });
  }

  removeEntry(index: number): void {
    this.previousEducations.splice(index, 1);
  }

  calculatePercentage(entry: PreviousEducationDetails): void {
    if (entry.totalMarks > 0) {
      entry.percentage = +(entry.marksObtained / entry.totalMarks * 100).toFixed(2);
    } else {
      entry.percentage = 0;
    }
  }

  savePreviousEducation(): void {
    this.studentService.savePreviousEducation(this.previousEducations).subscribe({
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
