import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from '../../models/studentResponse.model';

@Component({
  selector: 'app-student-view-edit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-view-edit.component.html',
  styleUrl: './student-view-edit.component.css'
})
export class StudentViewEditComponent {
  displayedColumns: string[] = ['name', 'mobileNumber','occupation','email','age'];

  // Dummy function for edit (you can open a modal or make fields editable)
  editGuardian(index: number) {
    const selectedGuardian = this.student.studentParentGuardians[index];
    console.log("Edit guardian:", selectedGuardian);
    // Show editable form or open a dialog with selectedGuardian data
  }
 
  getEmptyStudent(): Student  {
    return {  studentId: 0,
    userName: '',
    registrationId: 0,
    firstName: '',
    lastName: '',
    motherName: '',
    fatherName: '',
    guardianName: '',
    gender: '',
    age: 0,
    dateOfBirth: '',
    contactInfo: null,
    healthInfo: null,
    hobbies: [],
    profileImage: null,
  
    studentAddresses: [
      {
        addressId: 0,
        addressType: '',
        houseNumber: '',
        area: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
      }
    ],
  
      studentParentGuardians: [
        {
          guardianId: 1,
          name: 'Ramesh',
          guardianType: 'Father',
          mobileNumber: '9876543210',
          relationType: 'Parent',
          occupation: 'Engineer',
          email:'nagaraju@gmail.com',
          age:25,
          qualification:'MCA'
        },
        {
          guardianId: 2,
          name: 'Sita',
          guardianType: 'Mother',
          mobileNumber: '9876543211',
          relationType: 'Parent',
          occupation: 'Teacher',
          email:'sita@gmail.com',
          age:25,
          qualification:'B.Com'
        },
        {
          guardianId: 3,
          name: 'Anand',
          guardianType: 'Guardian',
          mobileNumber: '9876543212',
          relationType: 'Uncle',
          occupation: 'Doctor',
          email:'anand@gmail.com',
          age:25,
          qualification:'M.A'
        }
      ]
,
    
  
    studentGrade: {
      id:0,
      classGrade: '',
      section: '',
      rollNumber: ''
    },
  
    studentDemographic: {
      demographicId: 0,
      motherTongue: '',
    }
  };
}
  
  constructor(private route: ActivatedRoute, private studentService: StudentService, private snackBar: MatSnackBar) { }
  studentId: any;
  student: Student = this.getEmptyStudent(); // ✅ Add this line
 
  
  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.studentId = this.route.snapshot.params['id']; // Edit Mode
      console.log(this.studentId)
      this.studentService.getStudentById(this.studentId).subscribe({
        next: response => {
          console.log(response)
          this.student = {
            ...this.getEmptyStudent(),
            ...response
          };
          console.log(this.student)
          this.showMessage('Student details fetched Successfully!', 'success')
        },
        error: (err) => this.showMessage(err.error?.errorMessage || 'Failed to get student details!', 'error')
      });

    }
  }
  successMessage: string = '';
  errorMessage: string = '';

  showMessage(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  savePersonalInfo() {
    throw new Error('Method not implemented.');
  }
  personalForm!: FormGroup<any>;
  saveAddressInfo() {
    throw new Error('Method not implemented.');
  }
  addressForm!: FormGroup<any>;
  saveGradeInfo() {
    throw new Error('Method not implemented.');
  }

  gradeForm!: FormGroup<any>;
  submitParentInfo() {
    throw new Error('Method not implemented.');
  }
  submitAddressInfo() {
    throw new Error('Method not implemented.');
  }
  submitGradeInfo() {
    throw new Error('Method not implemented.');
  }
  submitPersonalInfo() {
    throw new Error('Method not implemented.');
  }
  submitAttendanceInfo() {
    throw new Error('Method not implemented.');
  }

}
