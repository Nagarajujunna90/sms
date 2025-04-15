import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentDataService } from '../../services/student-data.service';
import { StudentService } from '../../services/student.service';
import { MessageService } from '../../services/message.service';
import { StudentParentGardians as StudentParentGuardians } from '../../models/student-parent-guardians.models';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-parent-guardian',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-parent-guardian.component.html',
  styleUrls: ['./student-parent-guardian.component.css']
})
export class StudentParentGuardianComponent implements OnInit {
  parentGuardians: StudentParentGuardians[] = [];
  editIndex: number | null = null;
  studentId!: number;

  @ViewChild('parentForm', { static: true }) parentForm!: NgForm;

  constructor(
    private studentDataService: StudentDataService,
    private studentService: StudentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.parentGuardians = [this.getEmptyParentGuardianEntry()]; // Initialize with an empty entry
    this.studentDataService.getStudentId$().subscribe(id => {
      if (id !== null) {
        this.studentId = id;
        this.fetchAllParentGuardians();
      }
    });
  }

  fetchAllParentGuardians(): void {
    if (!this.studentId) return;
    this.studentService.getAllParentGuardiansById(this.studentId).subscribe({
      next: (data: StudentParentGuardians[]) => {
        this.parentGuardians = data || [];
        if (this.parentGuardians.length === 0) {
          this.addNewEntry();
        } else {
          this.editIndex = null;
        }
      },
      error: (err: any) => console.error('Error fetching parent/guardian data', err)
    });
  }

  addNewEntry(): void {
    if (this.parentForm && !this.parentForm.form.valid && this.editIndex !== null) {
      this.messageService.showMessage('Please complete the current entry before adding a new one.', 'error');
      return;
    }

    if (this.parentGuardians.length >= 3) {
      this.messageService.showMessage('Only 3 parent/guardian records allowed.', 'error');
      return;
    }

    this.parentGuardians.push(this.getEmptyParentGuardianEntry());
    this.editIndex = this.parentGuardians.length - 1;
  }

  getEmptyParentGuardianEntry(): StudentParentGuardians {
    return {
      guardianId: 0,
      studentId: this.studentId,
      name: '',
      relationType: 'Father',
      phoneNumber: '',
      emailId: '',
      occupation: '',
      qualification: '',
      age: 0
    };
  }

  editEntry(index: number): void {
    this.editIndex = index;
  }

  cancelEdit(): void {
    if (this.editIndex !== null) {
      const editingRow = this.parentGuardians[this.editIndex];
      if (editingRow.guardianId === 0) {
        this.parentGuardians.splice(this.editIndex, 1);
      }
      this.editIndex = null;
    }
  }

  saveParentGuardian(parent: StudentParentGuardians): void {
    if (!this.parentForm.form.valid) {
      this.messageService.showMessage('Please correct the errors before saving.', 'error');
      return;
    }

    parent.studentId = this.studentId;
    const isNew = parent.guardianId === 0;
    const request = this.studentService.saveParentInfo(parent);

    request.subscribe({
      next: () => {
        this.messageService.showMessage(isNew ? 'Parent/Guardian added' : 'Updated successfully', 'success');
        this.fetchAllParentGuardians();
        this.editIndex = null;
      },
      error: (err: any) => {
        console.error('Save failed:', err);
        this.messageService.showMessage('Save failed.', 'error');
      }
    });
  }

  deleteEntry(guardianId: number): void {
    if (!guardianId) return;
    this.studentService.deleteParentGuardian(guardianId).subscribe({
      next: () => {
        this.messageService.showMessage('Deleted successfully', 'success');
        this.fetchAllParentGuardians();
      },
      error: (err: any) => {
        console.error('Delete failed:', err);
        this.messageService.showMessage('Delete failed.', 'error');
      }
    });
  }
}
