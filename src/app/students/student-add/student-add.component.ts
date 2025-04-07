import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { StudentService } from '../student.service';
import { Student } from '../../models/student.model';
import { Address } from '../../models/Address.model';
import { AcademicDetails } from '../../models/AcademicDetails.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  imports: [SharedModule],
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent {



  selectedTab: number = 0;  // Initialize with first tab selected
  tabs = [
    { label: 'Personal Info' },
    { label: 'Address' },
    { label: 'Grade & Academic' },
    { label: 'Rewards & Achievements' },
    { label: 'Others' }
  ];


  grades = ['1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade'];

  personalInfo: Student = this.getDefaultStudent();
  address: Address = this.getDefaultAddress();
  gradeDetails: AcademicDetails = this.getDefaultAcademicDetails();

  getDefaultAcademicDetails(): AcademicDetails {
    return {
      studentId: 0,
      grade: '',
      section: 'A',
      rollNumber: 0,
      studentStatus: 'Active',
      academicYear: ''
    };
  }
  getDefaultAddress(): Address {
    return {
      street: '',
      city: '',
      state: '',
      zip: '',
      studentId: 0,
      addressType: 'permanent'
    };
  }

  getDefaultStudent(): Student {
    return {
      studentId: 0,
      userName: 'nagaraju',
      firstName: 'nag',
      lastName: 'junna',
      motherName: 'sam',
      fatherName: 'venkat',
      guardianName: 'xyz',
      gender: 'male',
      age: 3,
      dateOfBirth: '02-03-1991',
      mobileNumber: '987654321',
      emergencyNumber: '987654321',
      bloodGroup: 'A',
      weight: 13,
      height: 12,
      nationality: 'Indian',
      religion: 'Hindu',
      identityMarks: 'A mole on the left eye',
      disability: 'N',
      hobbies: ['vollyball', 'reading']
    };
  }

  academicYears: string[] = [];
  selectedYear: string = '';

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    const range = 5; // generate 5 years (past, current, future)

    for (let i = currentYear - 2; i <= currentYear + 2; i++) {
      this.academicYears.push(`${i}-${i + 1}`);
    }
  }

  // onSelectYear(event: any): void {
  //   this.selectedYear = event.target.value;
  //   console.log('Selected Academic Year:', this.selectedYear);
  // }



  // Tab switching function
  selectTab(index: number) {
    this.selectedTab = index;
  }
  constructor(private studentService: StudentService, private snackBar: MatSnackBar) { }

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

  studentId: number = 0;
  savePersonalInfo() {
    this.studentService.savePersonalInfo(this.personalInfo).subscribe({
      next: response => {
        console.log(response)
        this.studentId = response.studentId;
        this.showMessage('Personal Info Saved Successfully!', 'success')
      },
      error: (err) => this.showMessage(err.error?.errorMessage || 'Something went wrong!', 'error')
    });
  }
  saveAddress() {
    this.address.studentId = this.studentId;
    console.log(this.address)
    this.studentService.saveAddress(this.address).subscribe({
      next: response => {
        this.showMessage('Address Saved Successfully!', 'success')
      },
      error: (err) => this.showMessage(err.error?.errorMessage || 'Failed to save address!', 'error')
    });
  }


  saveGrade() {
    this.gradeDetails.studentId = this.studentId;
    console.log(this.gradeDetails)
    this.studentService.saveGradeDetails(this.gradeDetails).subscribe({
      next: () => this.showMessage('Grade Details Saved Successfully!', 'success'),
      error: (err) => this.showMessage(err.error?.errorMessage || 'Failed to save grade details!', 'error')
    });
  }
  closeAlert() {
    this.successMessage = '';
  }
  closeError() {
    this.errorMessage = '';
  }
  // constructor(private fb: FormBuilder, private studentService: StudentService) {
  //   this.personalInfo = this.fb.group({
  //     userName: ['nagaraju', Validators.required],
  //     firstName: ['junna', Validators.required],
  //     lastName: ['nagaraju', Validators.required],
  //     motherName: ['sammakka', Validators.required],
  //     fatherName: ['venkataiah', Validators.required],
  //     guardianName: ['na'],
  //     gender: ['male', Validators.required],
  //     age: [5, [Validators.required, Validators.min(1)]],
  //     dateOfBirth: ['05-01-1991', Validators.required],
  //     nationality: ['Indian', Validators.required],
  //     religion: ['Hindu', Validators.required],
  //     mobileNumber: ['9701944846', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
  //     emergencyNumber: ['9701944846', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
  //     weight: [1, Validators.required],
  //     height: [2, Validators.required],
  //     identityMarks: ['na'],
  //     disability: [''],
  //     bloodGroup: ['A', Validators.required],
  //   //  hobbies: [[]]
  //   });
  // }

  // onSubmit() {
  //   if (this.personalInfo.valid) {
  //     const studentData: Student = this.personalInfo.value;
  //     this.studentService.addStudent(studentData).subscribe({
  //       next: response => alert('Student added successfully!'),
  //       error: err => alert(err)
  //     });
  //   } else {
  //     alert('Please fill all required fields correctly.');
  //   }
  // }
}
