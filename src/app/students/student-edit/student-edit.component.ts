import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { StudentService } from '../student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-edit',
  imports: [SharedModule],
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  student: Student | null = null;
  studentId!: number;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.studentId) {
      this.getStudentById(this.studentId);
    }
  }

  getStudentById(id: number) {
    this.studentService.getStudentById(id).subscribe(
      (data: Student) => {
        this.student = data;
      },
      (error) => {
        console.error('Error fetching student details:', error);
      }
    );
  }

  updateStudent() {
    if (this.student) {
      this.studentService.updateStudent(this.studentId, this.student).subscribe(
        () => {
          alert('Student updated successfully!');
          this.router.navigate(['/students']);
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
    }
  }

  cancelEdit() {
    this.router.navigate(['/students']);
  }
}
