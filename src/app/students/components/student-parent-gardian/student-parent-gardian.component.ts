import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../../shared/shared.module';
import { StudentDataService } from '../../services/student-data.service';
import { StudentService } from '../../services/student.service';
import { StudentParentGardians } from '../../models/student-parent-guardians.models';

@Component({
  selector: 'app-student-parent-guardian',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-parent-gardian.component.html',
  styleUrls: ['./student-parent-gardian.component.css']
})

export class StudentParentGuardianComponent implements OnInit {

  parentGuardians: StudentParentGardians[] = [];
  studentId = 0;
  parentGuardianId = 0;
  isEditMode = false;
  editIndex: number | null = null;

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private studentDataService: StudentDataService
  ) {}

  ngOnInit(): void {
    this.subscribeToStudentId();
    this.fetchAllParentGuardians();
  }

  private subscribeToStudentId(): void {
    this.studentDataService.getStudentId$().subscribe(id => {
      if (id) {
        this.studentId = id;
        console.log('Received Student ID:', id);
        this.fetchAllParentGuardians();
      }
    });
  }

  private fetchAllParentGuardians(): void {
    if (!this.studentId) return;

    this.studentService.getAllParentGuardiansById(this.studentId).subscribe({
      next: (data) => {
        this.parentGuardians = data || [];
      },
      error: (err) => {
        console.error('Failed to fetch parent/guardian details:', err);
      }
    });
  }

  addNewEntry(): void {
    const newEntry = this.getEmptyParentGuardianEntry();
    this.parentGuardians.push(newEntry);
    this.editIndex = this.parentGuardians.length - 1;
  }

  editEntry(index: number): void {
    this.editIndex = index;
  }

  cancelEdit(): void {
    this.editIndex = null;
    this.fetchAllParentGuardians();
  }

  deleteEntry(id: number): void {
    if (!confirm('Are you sure you want to delete this record?')) return;
    this.studentService.deleteParentGuardian(id).subscribe({
      next: () => {
        this.showMessage('Record deleted successfully!', 'success');
        this.fetchAllParentGuardians();
      },
      error: () => this.showMessage('Failed to delete record.', 'error')
    });
  }

  saveParentGuardian(entry: StudentParentGardians): void {
    entry.studentId = this.studentId;
    this.studentService.saveParentInfo(entry).subscribe({
      next: () => {
        this.showMessage('Parent/Guardian details saved!', 'success');
        this.editIndex = null;
        this.fetchAllParentGuardians();
      },
      error: () => this.showMessage('Failed to save parent/guardian details.', 'error')
    });
  }

  private getEmptyParentGuardianEntry(): StudentParentGardians {
    return {
  guardianId: 0,
  name: '',
  relationType: 'Father',
  phoneNumber: '',
  email: '',
  occupation: '',
  studentId: this.studentId,
  qualification: '',
  age: 0,
};
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
}
