import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentDataService } from '../../services/student-data.service';
import { StudentService } from '../../services/student.service';
import { StudentParentGardians } from '../../models/student-parent-guardians.models';
import { MessageService } from '../../services/message.service';
import { SharedModule } from '../../../shared/shared.module';

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
  editIndex: number | null = null;

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private studentDataService: StudentDataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.subscribeToStudentId();
  }

  private subscribeToStudentId(): void {
    this.studentDataService.getStudentId$().subscribe(id => {
      if (id) {
        this.studentId = id;
        this.fetchAllParentGuardians();
      }
    });
  }

  private fetchAllParentGuardians(): void {
    if (!this.studentId) return;

    this.studentService.getAllParentGuardiansById(this.studentId).subscribe({
      next: (data) => {
        this.parentGuardians = data || [];
        if (this.parentGuardians.length === 0) {
          this.addNewEntry(); // default row if empty
        } else {
          this.editIndex = null;
        }
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

  private getEmptyParentGuardianEntry(): StudentParentGardians {
    return {
      guardianId: 0,
      studentId: this.studentId,
      name: '',
      relationType: 'Guardian',
      phoneNumber: '',
      email: '',
      occupation: '',
      qualification: '',
      age: 18
    };
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
        this.messageService.show('Deleted successfully!', 'success');
        this.fetchAllParentGuardians();
      },
      error: () => this.messageService.show('Failed to delete!', 'error')
    });
  }

  saveParentGuardian(entry: StudentParentGardians): void {
    entry.studentId = this.studentId;
    this.studentService.saveParentInfo(entry).subscribe({
      next: () => {
        this.messageService.show('Parent/Guardian details saved!', 'success');
        this.editIndex = null;
        this.fetchAllParentGuardians();
      },
      error: () => this.messageService.show('Failed to save parent/guardian details.', 'error')
    });
  }
}
