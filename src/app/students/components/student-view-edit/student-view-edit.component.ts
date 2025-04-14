import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginCredentials, StudentResponse } from '../../models/studentResponse.model';
import { StudentAddress } from '../../models/student-address.model';
import { StudentGrade } from '../../models/student-current-academic.model';
import { StudentDemographic } from '../../models/student-demographic.model';
import { StudentHealthInfo } from '../../models/student-health.model';
import { StudentParentGardians } from '../../models/student-parent-guardians.models';
import { StudentDocuments } from '../../models/student.documents.model';
import { StudentAttendances } from '../../models/student-attendence.model';
import { StudentFeeDetails } from '../../models/student-fee.model';
import { StudentTransport } from '../../models/student-transport.model';
import { StudentPreviousAcademicDetails } from '../../models/student-previous-academic.model';

@Component({
  selector: 'app-student-view-edit',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-view-edit.component.html',
  styleUrl: './student-view-edit.component.css'
})
export class StudentViewEditComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private snackBar: MatSnackBar) { }

  isEditMode: boolean = false;
  displayedColumns: string[] = ['name', 'mobileNumber', 'occupation', 'age', 'email'];
  eduColumns: string[] = ['schoolName', 'grade', 'academicYear', 'percentage'];
  studentId: any;

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.studentId = this.route.snapshot.params['id']; // Edit Mode
      console.log(this.studentId)
      this.studentService.getStudentById(this.studentId).subscribe({
        next: response => {
          console.log(response)
          console.log(this.studentParentGuardians[0])

          this.student = {
            ...this.getEmptyStudent(),
            ...response
          };
          this.studentAddresses = this.student.studentAddresses;
          this.studentParentGuardians = this.student.studentParentGuardians;
          this.studentGrade = this.student.studentGrade;
          this.studentPreviousAcademicDetails = this.student.studentPreviousAcademicDetails;
          this.studentDocuments = this.student.documents;
          this.studentDemographic = this.student.studentDemographic;
          this.studentTransport = this.student.transport;
          this.studentFeeDetails = this.student.feeDetails;
          this.studentAttendance = this.student.attendance;
          this.studentHealthInfo = this.student.healthInfo;
          this.studentLoginCredentials = this.student.loginCredentials;
          console.log(this.student)
          // this.showMessage('Student details fetched Successfully!', 'success')
        },
        error: (err) => { }// this.showMessage(err.error?.errorMessage || 'Failed to get student details!', 'error')
      });

    }
    if (!this.studentAddresses || this.studentAddresses.length === 0) {
      this.studentAddresses = [{
        addressType: '',
        houseNumber: '',
        area: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        landmark: '',
        addressId: 0,
        studentId: 0
      }];
    }

  }

  student: StudentResponse = this.getEmptyStudent();
  studentAddresses: StudentAddress[] = this.student.studentAddresses;
  studentParentGuardians: StudentParentGardians[] = this.student.studentParentGuardians;
  studentGrade: StudentGrade = this.student.studentGrade;
  studentPreviousAcademicDetails: StudentPreviousAcademicDetails[] = this.student.studentPreviousAcademicDetails;
  studentDocuments: StudentDocuments[] = this.student.documents;
  studentDemographic: StudentDemographic = this.student.studentDemographic;
  studentTransport: StudentTransport = this.student.transport;
  studentFeeDetails: StudentFeeDetails = this.student.feeDetails;
  studentAttendance: StudentAttendances = this.student.attendance;
  studentHealthInfo: StudentHealthInfo = this.student.healthInfo;
  studentLoginCredentials: LoginCredentials = this.student.loginCredentials;

  viewAndUpdateStudent(studentId: number) {
    console.log(studentId)
   // this.router.navigate(['dashboard/students/update', studentId, 'personal-info']);
  //  this.router.navigate(['dashboard/students', studentId, 'personal-info']);
  const id = this.route.snapshot.params['id'];
  this.router.navigate([`/dashboard/students/update/${id}/personal-info`]);
  
  }


  getEmptyStudent(): StudentResponse {
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
      gender: 'Female',

      studentParentGuardians: [
        {
          guardianId: 0,
          age: 0,
          name: '',
          qualification: '',
          occupation: '',
          phoneNumber: '',
          email: '',
          relationType: 'Father',
          studentId: 0
        }
      ],

      studentGrade: {
        gradeId: 0,
        grade: '',
        section: '',
        rollNumber: 0,
        academicYear: '',
        studentId: 0,
        studentStatus: ''
      },

      studentPreviousAcademicDetails: [
        {
          schoolName: '',
          grade: '',
          section: '',
          remark: '',
          transferCertificate: false,
          academicYear: '',
          rollNumber: 0,
          board: '',
          percentage: 0,
          medium: '',
          studentStatus: '',
          schoolAddress: '',
          marks: 0,
          totalMarks: 0,
          studentId: 0,
          id: 0
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
          landmark: '',
          studentId: 0
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

}
