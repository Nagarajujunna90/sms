import { Component, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';
import { StudentPersonalInfo } from '../../models/student-personal-info.model';
import { StudentService } from '../../services/student.service';
import { StudentDataService } from '../../services/student-data.service';
import { MessageService } from '../../services/message.service';
@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-student-personal-info',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-personal-info.component.html',
  styleUrls: ['./student-personal-info.component.css']
})
export class StudentPersonalInfoComponent {
  studentPersonalInfo: StudentPersonalInfo = this.getDefaultStudent();
  studentId: number = 0;
  isEditMode = false;

  constructor(
    private studentService: StudentService,
    private messageService: MessageService,
    private studentDataService: StudentDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentDataService.getStudentId$().subscribe(id => {
      if (id) {
        this.studentId = id;
        this.loadStudentData();
      }
    });

    // Also check if student data already exists in shared service
    const student = this.studentDataService.getStudentData();
    if (student && student.studentId) {
      this.studentPersonalInfo = student;
      this.studentId = student.studentId;
      this.isEditMode = true;
    }
  }

  private loadStudentData(): void {
    if(this.studentId){
    this.studentService.getStudentById(this.studentId).subscribe({
      next: (response) => {
        this.studentPersonalInfo = response;
        this.studentDataService.setStudentData(response);
        this.isEditMode = true;
      },
      error: () => {
        this.messageService.showMessage('Failed to fetch student data', 'error');
      }
    });
  }
}
  savePersonalInfo(): void {
    this.studentPersonalInfo.studentId = this.studentId;

    if (!this.isFormValid()) {
      this.messageService.showMessage('Please fill in all required fields correctly.', 'error');
      return;
    }

    if (!this.isEditMode) {
      this.studentService.savePersonalInfo(this.studentPersonalInfo).subscribe({
        next: (response) => {
          this.studentId = response.studentId;
          this.studentDataService.setStudentId(this.studentId);
          this.messageService.showMessage('Saved successfully!', 'success');
        },
        error: () => {
          this.messageService.showMessage('Something went wrong', 'error');
        }
      });
    } else {
      this.studentService.updateStudent(this.studentId, this.studentPersonalInfo).subscribe({
        next: () => {
          this.messageService.showMessage('Updated successfully!', 'success');
        },
        error: () => {
          this.messageService.showMessage('Something went wrong', 'error');
        }
      });
    }
  }

  isFormValid(): boolean {
    const s = this.studentPersonalInfo;
    return !!(s.firstName && s.lastName && s.userName && s.gender &&
              s.dateOfBirth && s.emailId && s.phoneNumber);
  }

  clearForm(): void {
    this.studentPersonalInfo = this.getDefaultStudent();
    this.isEditMode = false;
  }

  private getDefaultStudent(): StudentPersonalInfo {
    return {
      studentId: 0,
      userName: '',
      firstName: '',
      lastName: '',
      gender: '',
      age: 0,
      dateOfBirth: '',
      phoneNumber: '',
      identityMarks: '',
      profilePicture: '',
      emailId: ''
    };
  }
}
