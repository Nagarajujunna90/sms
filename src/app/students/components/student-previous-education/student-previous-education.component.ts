import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentPreviousAcademicDetails } from '../../models/student-previous-academic.model';
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

  previousEducations: StudentPreviousAcademicDetails[] = [];
  studentId = 0;
  previousEducationId = 0;
  academicYears: string[] = [];
  selectedYear = '';
  isEditMode = false;
  editIndex: number | null = null;

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private studentDataService: StudentDataService
  ) {}

  ngOnInit(): void {
    this.initializeAcademicYears();
    this.subscribeToStudentId();
    this.fetchAllPreviousEducations();
  }

  private initializeAcademicYears(): void {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 2; i <= currentYear + 2; i++) {
      this.academicYears.push(`${i}-${i + 1}`);
    }
  }

  private subscribeToStudentId(): void {
    this.studentDataService.getStudentId$().subscribe(id => {
      if (id) {
        this.studentId = id;
        console.log('Received Student ID:', id);
        this.fetchAllPreviousEducations();
      }
    });
  }

  private fetchAllPreviousEducations(): void {
    if (!this.studentId) return;

    this.studentService.getAllPreviousEducations(this.studentId).subscribe({
      next: (data) => {
        this.previousEducations = data || [];
      },
      error: (err) => {
        console.error('Failed to fetch all previous education details:', err);
      }
    });
  }

  addNewEntry(): void {
    const newEntry = this.getEmptyEducationEntry();
    this.previousEducations.push(newEntry);
    this.editIndex = this.previousEducations.length - 1;
  }

  editEntry(index: number): void {
    this.editIndex = index;
  }

  cancelEdit(): void {
    this.editIndex = null;
    this.fetchAllPreviousEducations();
  }

  deleteEntry(id: number): void {
    if (!confirm('Are you sure you want to delete this record?')) return;
    this.studentService.deletePreviousEducation(id).subscribe({
      next: () => {
        this.showMessage('Record deleted successfully!', 'success');
        this.fetchAllPreviousEducations();
      },
      error: () => this.showMessage('Failed to delete record.', 'error')
    });
  }

  calculatePercentage(entry: StudentPreviousAcademicDetails): void {
    if (entry.totalMarks > 0) {
      entry.percentage = +((entry.marks / entry.totalMarks) * 100).toFixed(2);
    } else {
      entry.percentage = 0;
    }
  }

  savePreviousEducation(entry: StudentPreviousAcademicDetails): void {
    // Validate required fields
    if (!entry.academicYear || !entry.grade || !entry.section || !entry.rollNumber || entry.marks === null || entry.totalMarks === null) {
      this.showMessage('Please fill in all required fields.', 'error');
      return;
    }
    
    if (entry.marks > entry.totalMarks) {
      this.showMessage('Marks cannot be greater than Total Marks.', 'error');
      return;
    }

    entry.studentId = this.studentId;
    this.studentService.savePreviousEducation(entry).subscribe({
      next: () => {
        this.showMessage('Previous education saved!', 'success');
        this.editIndex = null;
        this.fetchAllPreviousEducations();
      },
      error: () => this.showMessage('Failed to save previous education.', 'error')
    });
  }

  clearForm(entry: StudentPreviousAcademicDetails): void {
    // Clear the form by resetting the current entry
    Object.assign(entry, this.getEmptyEducationEntry());
  }

  private getEmptyEducationEntry(): StudentPreviousAcademicDetails {
    return {
      id: 0,
      grade: '',
      section: '',
      rollNumber: 0,
      medium: '',
      studentStatus: '',
      schoolName: '',
      schoolAddress: '',
      board: '',
      marks: 0,
      totalMarks: 0,
      percentage: 0,
      academicYear: '',
      remark: '',
      transferCertificate: false,
      studentId: this.studentId
    };
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
}
