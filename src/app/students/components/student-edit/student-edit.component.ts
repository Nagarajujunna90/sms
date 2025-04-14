import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { Student } from '../../models/student-personal-info.model';
import { StudentService } from '../../services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';
import { StudentDataService } from '../../services/student-data.service';

@Component({
  selector: 'app-student-edit',
  imports: [SharedModule],
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  tabRoutes = ['personal-info','parent-guardian', 'address', 'academic', 'previous-education', 'reports'];
  selectedTab: number = 0;  // Initialize with first tab selected
  previousTab: number = 0; // to track last tab
  studentId: any;

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private studentDataService: StudentDataService

  ) { }
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      const activeTab = this.route.firstChild?.snapshot.url[0]?.path;
      const index = this.tabRoutes.indexOf(activeTab ?? '');
      this.selectedTab = index !== -1 ? index : 0;
      // Navigate to default tab if none selected
      if (!activeTab) {
        this.router.navigate(['personal-info'], { relativeTo: this.route });
      }
      this.studentId = +this.route.snapshot.paramMap.get('id')!;
      this.studentService.getStudentById(this.studentId).subscribe(data => {
        this.studentDataService.setStudentData(data);
      });
    });
  }

  onTabChange(index: number): void {
    console.log('Tab changed to index:', index);
    this.selectedTab = index;

    if (this.selectedTab === 0 && index !== 0) {
      // Leaving "Personal Info" tab
      const isConfirmed = confirm('You will be logged out if you leave Personal Info tab. Continue?');
      if (!isConfirmed) {
        // Stay on current tab
        setTimeout(() => {
          this.selectedTab = 0;
        });
        return;
      } else {
        console.log('Confirmed leave from personal info');
      }
    }

    // ✅ Update selected tab only after confirmation
    this.selectedTab = index;
    this.previousTab = index;

    const selectedRoute = this.tabRoutes[index];
    console.log('Navigating to route:', selectedRoute);

    // ✅ Correct navigation
    this.router.navigate([selectedRoute], { relativeTo: this.route });

  }


student: Student | undefined ;
  getStudentById(id: number) {
    if (this.route.snapshot.params['id']) {
      this.studentId = this.route.snapshot.params['id']; // Edit Mode
      console.log(this.studentId)
    }
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
