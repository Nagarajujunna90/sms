import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { Student } from '../../models/student-personal-info.model';
import { StudentDataService } from '../../services/student-data.service';
import { StudentService } from '../../services/student.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-student-personal-info',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-personal-info.component.html',
  styleUrl: './student-personal-info.component.css'
})
export class StudentPersonalInfoComponent implements OnInit{
  constructor(
    private studentService: StudentService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private studentDataService: StudentDataService 
  ) {}

  mode: 'ADD' | 'EDIT' = 'ADD';
  student: Student = this.getDefaultStudent();
  studentId: number = 0;
  ngOnInit(): void {
    console.log('✅ StudentPersonalInfoComponent loaded!');
    const idParam = this.route.parent?.snapshot.paramMap.get('id');
    console.log('id param',idParam)
    this.studentDataService.getStudentId$().subscribe(id => {
      if (id) {
        console.log('Personal Info Received Student ID:', id);
        this.studentId = id;
      }
    });

    console.log('ADD',this.studentId)

    if (idParam) {
      this.mode = 'EDIT';
      this.studentId = +idParam;
      // Or get it from shared service if already available
      //this.student = this.studentDataService.getStudentData();
      this.studentService.getStudentById(this.studentId).subscribe({
        next: (studentData) => {
          this.student = studentData;
          console.log('Fetched student from API:', this.student);
          this.studentDataService.setStudentData(this.student );
        },
        error: () => {
          this.messageService.show('Failed to load student data', 'error');
        }
      });
      console.log('sharedData',this.student)
    } else {
      this.mode = 'ADD';
      this.student = this.getDefaultStudent();
      console.log('ADD',this.studentId)
      if(this.studentId){
        this.studentService.getStudentById(this.studentId).subscribe({
          next:(response)=>{
            this.student=response;
          }
        });
      }
    }
  }

  getDefaultStudent(): Student {
    return {
      studentId: 0,
      userName: '',
      firstName: '',
      lastName: '',
      gender: '',
      age: 0,
      dateOfBirth: '',
      mobileNumber: '',
      identityMarks: '',
      profilePicture: '',
      emaild: ''
    };
  }

  savePersonalInfo(): void {
    if (this.mode === 'ADD') {
      this.studentService.savePersonalInfo(this.student).subscribe({
        next: response => {
          this.studentId = response.studentId;
          this.studentDataService.setStudentId(this.studentId);
          this.messageService.show('Saved successfully!', 'success');
        },
        error: () => {
          this.messageService.show('Something went wrong', 'error');
        }
      });
    } else {
      this.studentService.updateStudent(this.studentId, this.student).subscribe({
        next: response => {
          this.studentId = response.studentId;
          this.studentDataService.setStudentId(this.studentId);
          this.messageService.show('Updated successfully!', 'success');
        },
        error: () => {
          this.messageService.show('Something went wrong', 'error');
        }
      });
    }
  }
}
