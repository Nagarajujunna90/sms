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

  isEditMode: boolean = false; // default to view-only


saveAddress() {
throw new Error('Method not implemented.');
}
  saveGuardianInfo() {
    throw new Error('Method not implemented.');
  }
  saveContactInfo() {
    throw new Error('Method not implemented.');
  }

  // Dummy function for edit (you can open a modal or make fields editable)
  editGuardian(index: number) {
    const selectedGuardian = this.student.studentParentGuardians[index];
    console.log("Edit guardian:", selectedGuardian);
    // Show editable form or open a dialog with selectedGuardian data
  }

  getEmptyStudent(): Student {
    return {
      studentId: 0,
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      age: 0,
      email: '',
      phoneNumber: '',
      identityMarks: '',
      profilePhoto: '',
      gender:'Female',
      bloodGroup: '',
  
      studentParentGuardians: [
        {
          guardianId: 0,
          age: 0,
          name: '',
          qualification: '',
          occupation: '',
          mobileNumber: '',
          email: '',
          relationType: 'Father',
          studentId: 0
        }
      ],
  
      studentGrade: {
        gradeId: 0,
        classGrade: '',
        section: '',
        rollNumber: 0,
        admissionNumber: '',
        academicYear: ''
      },
  
      studentPreviousAcademicDetails: [
        {
          schoolName: '',
          grade: '',
          section: '',
          remark: '',
          transferCertificate: false,
          duration: '',
          academicYear: '',
          rollNumber: 0,
          board: '',
          percentage:''
        }
      ],
  
      studentAddresses: [
        {
          addressId: 0,
          houseNumber: '',
          area: '',
          city: '',
          state: '',
          country: '',
          zipCode: '',
          addressType: '',
          landmark: ''
        }
      ],
  
      documents: [
        {
          documentType: '',
          documentNumber: ''
        }
      ],
  
      studentDemographic: {
        demographicId: 0,
        motherTongue: '',
        nationality: '',
        religion: '',
        caste: '',
        subCaste: ''
      },
  
      transport: {
        modeOfTransport: 'Own',
        pickupPoint: '',
        busRouteNumber: '',
        driverContact: '',
        distanceFromSchool: ''
      },
  
      feeDetails: {
        totalFees: 0,
        feePaid: 0,
        balance: 0,
        dueDates: [],
        paymentHistory: [
          {
            date: '',
            amount: 0,
            mode: '',
            transactionId: ''
          }
        ]
      },
  
      attendance: {
        daysPresent: 0,
        daysAbsent: 0,
        totalWorkingDays: 0,
        percentage: 0,
        termWiseBreakdown: [
          {
            term: '',
            present: 0,
            absent: 0,
            workingDays: 0
          }
        ]
      },
  
      healthInfo: {
        allergies: '',
        medicalConditions: '',
        emergencyContact: ''
      },
  
      loginCredentials: {
        userName: '',
        password: ''
      }
    };
  }
  
  displayedColumns: string[] = ['name', 'mobileNumber', 'occupation', 'age', 'email'];
  eduColumns: string[] = ['schoolName', 'grade', 'academicYear', 'percentage'];


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
