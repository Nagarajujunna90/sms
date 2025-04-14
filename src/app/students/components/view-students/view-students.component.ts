import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-students',
  imports: [SharedModule],
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
[x: string]: any;
  searchForm!: FormGroup;
  students: any[] = [];

  constructor(
     private fb: FormBuilder,
     private studentService: StudentService,
     private router:Router) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      userName: [''],
      class: [''],
      gender: [''],
      age: ['']
    });
    this.getStudents(); // Load all students initially
  }

  getStudents(): void {
    const filters = this.searchForm.value;
    this.studentService.getStudentsByFilter(filters).subscribe(data => {
      this.students = data;
    });
  }

  resetForm(): void {
    this.searchForm.reset();
    this.getStudents();
  }
  viewAndEditStudent(studentId:number){
    console.log(studentId)
    this.router.navigate(['dashboard/students/edit', studentId]);
  }
}
