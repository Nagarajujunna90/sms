import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  templateUrl: './student-list.component.html',
  imports: [SharedModule],
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    console.log(this.students);
    console.log('coming')
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      
        console.log('Fetched students:', this.students);
      },
      error: (error) => {
        console.error('Error fetching students:', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);  // Redirect unauthorized users
        }
      },
      complete: () => {
        console.log('Student data loading complete.');
      }
    });
    
  }

  editStudent(studentId: number): void {
    this.router.navigate(['/dashboard/students/edit', studentId]);
  }

  deleteStudent(studentId: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(studentId).subscribe(() => {
        this.students = this.students.filter(student => student.studentId !== studentId);
      });
    }
  }
}
