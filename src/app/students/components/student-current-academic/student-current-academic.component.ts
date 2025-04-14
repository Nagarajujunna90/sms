import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { StudentGrade } from '../../models/student-current-academic.model';
import { StudentDataService } from '../../services/student-data.service';
import { StudentService } from '../../services/student.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentResponse } from '../../models/studentResponse.model';

@Component({
  selector: 'app-student-academic-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-current-academic.component.html',
  styleUrls: ['./student-current-academic.component.css']
})

export class StudentAcademicDetailsComponent {
  constructor(
    private studentService: StudentService,
    private messageService: MessageService,
    private studentDataService: StudentDataService
  ) { }
 
  student!: StudentResponse;
  gradeId: number = 0;
  studentId: number = 0;
  isEditMode: boolean = false;

  grades : string[]  = ['Nursary', 'LKG', 'UKG', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade'];
  studentStatuses: string[] = ['Active', 'InActive'];
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
        this.studentId = id;
      }
    });
    
    this.studentDataService.getGradeId$().subscribe(id => {
      if (id) {
        console.log('Received Grade Tab,Grade ID:', id);
        this.gradeId = id;
      }
    });
 
    //calling this for edit student address.
     if (this.studentId && this.gradeId) {
      this.studentService.getGrade(this.gradeId).subscribe({
        next: (gradeResponseById) => {
          // Normalize values to ensure matching with dropdowns
          this.gradeDetails = {
            ...gradeResponseById,
            academicYear: gradeResponseById.academicYear?.trim(),
            studentStatus : gradeResponseById.studentStatus?.trim(),
            grade: gradeResponseById.grade?.trim()

          };
          this.isEditMode = true;
        }
      });
      this.student = this.studentDataService.getStudentData();
   //   this.gradeDetails=this.student.studentGrade;
 
    } 
  }

  gradeDetails: StudentGrade = this.getDefaultAcademicDetails();
  getDefaultAcademicDetails(): StudentGrade {
    return {
      studentId: 0,
      grade: '',
      section: 'A',
      rollNumber: 0,
      studentStatus: 'Active',
      academicYear: '',
      gradeId: 0
    };
  }

  saveGrade() {
    this.gradeDetails.studentId = this.studentId;
    console.log(this.gradeDetails)
    if (!this.isEditMode) {
      this.studentService.saveGrade(this.gradeDetails).subscribe({
        next: (response) => {
          this.gradeId=response.gradeId;
          console.log(this.gradeId)
          this.studentDataService.setGradeId(response.gradeId)
          this.messageService.show('Saved successfully!', 'success');
        },
        error: (err) => {
          this.messageService.show('Something went wrong', 'error');
        }
      });

    } else {
      this.studentService.saveGrade(this.gradeDetails).subscribe({
        next: (response) => {
          this.gradeId=response.gradeId;
          this.studentDataService.setGradeId(response.gradeId)
          this.messageService.show('Saved successfully!', 'success');
        },
        error: (err) => {
          this.messageService.show('Something went wrong', 'error');
        }
      });
    }
  }
}
