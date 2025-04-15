import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentPreviousAcademicDetails } from '../../models/student-previous-academic.model';
import { SharedModule } from '../../../shared/shared.module';
import { StudentDataService } from '../../services/student-data.service';
import { StudentService } from '../../services/student.service';
import { MessageService } from '../../services/message.service';

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
  academicYears: string[] = [];
  editIndex: number | null = null;
  grades: string[] = ['Nursary', 'LKG', 'UKG', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade'];
  studentStatuses: string[] = ['Active', 'InActive'];

  @ViewChild('newRow') newRow: ElementRef | null = null;

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private studentDataService: StudentDataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeAcademicYears();
    this.subscribeToStudentId();
  }

  private initializeAcademicYears(): void {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i < currentYear; i++) {
      this.academicYears.push(`${i}-${i + 1}`);
    }
  }

  private subscribeToStudentId(): void {
    this.studentDataService.getStudentId$().subscribe(id => {
      if (id) {
        this.studentId = id;
        this.fetchAllPreviousEducations();
      }
    });
  }

  private fetchAllPreviousEducations(): void {
    if (!this.studentId) return;

    this.studentService.getAllPreviousEducations(this.studentId).subscribe({
      next: (data) => {
        this.previousEducations = data || [];
        if (!this.previousEducations.length) {
          this.addNewEntry(); // Add default empty row if no data
        }
      },
      error: (err) => {
        console.error('Failed to fetch previous education details:', err);
      }
    });
  }

  addNewEntry(): void {
    const newEntry = this.getEmptyEducationEntry();
    this.previousEducations.push(newEntry);
    this.editIndex = this.previousEducations.length - 1;

    setTimeout(() => {
      if (this.newRow) {
        this.newRow.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  }

  editEntry(index: number): void {
    this.editIndex = index;
  }

  cancelEdit(): void {
    if (this.editIndex !== null) {
      const current = this.previousEducations[this.editIndex];
      if (current.id === 0) {
        this.previousEducations.splice(this.editIndex, 1);
        if (!this.previousEducations.length) {
          this.addNewEntry(); // Re-add empty row if all removed
        }
      } else {
        this.fetchAllPreviousEducations(); // Reload data
      }
      this.editIndex = null;
    }
  }

  deleteEntry(id: number): void {
    if (!confirm('Are you sure you want to delete this record?')) return;

    this.studentService.deletePreviousEducation(id).subscribe({
      next: () => {
        this.messageService.showMessage('Record deleted successfully!', 'success');
        this.fetchAllPreviousEducations();
      },
      error: () => this.messageService.showMessage('Failed to delete record.', 'error')
    });
  }

  savePreviousEducation(entry: StudentPreviousAcademicDetails): void {
    if (!entry.academicYear || !entry.grade || !entry.section || !entry.rollNumber || !entry.schoolName || !entry.schoolAddress) {
      this.messageService.showMessage('Please fill in all required fields.', 'error');
      return;
    }

    entry.studentId = this.studentId;

    if (entry.id === 0) {
      this.studentService.savePreviousEducation(entry).subscribe({
        next: () => {
          this.messageService.showMessage('Previous education saved!', 'success');
          this.editIndex = null;
          this.fetchAllPreviousEducations();
        },
        error: () => this.messageService.showMessage('Failed to save previous education.', 'error')
      });
    } else {
      this.studentService.updatePreviousEducation(entry.id, entry).subscribe({
        next: () => {
          this.messageService.showMessage('Previous education updated!', 'success');
          this.editIndex = null;
          this.fetchAllPreviousEducations();
        },
        error: () => this.messageService.showMessage('Failed to update previous education.', 'error')
      });
    }
  }

  clearForm(entry: StudentPreviousAcademicDetails): void {
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

  get isAddingNewRow(): boolean {
    return this.editIndex === this.previousEducations.length - 1 && this.previousEducations[this.editIndex].id === 0;
  }
}
