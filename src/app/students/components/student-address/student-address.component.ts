import { Component } from '@angular/core';
import { Address } from '../../models/Address.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../../shared/shared.module';
import { StudentDataService } from '../../services/student-data.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-address',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-address.component.html',
  styleUrl: './student-address.component.css'
})
export class StudentAddressComponent {
  constructor(private studentService: StudentService, private snackBar: MatSnackBar, private studentDataService: StudentDataService) { }
  studentId: number = 0;
  ngOnInit() {
    this.studentDataService.getStudentId$().subscribe(id => {
      if (id) {
        console.log('Received Student ID:', id);
        this.studentId = id;
      }
    });
  }

  studentAddresses: Address[] = this.getDefaultAddress();

  getDefaultAddress(): Address[] {
    return [
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
    ];
  }
  
  saveAddress() {
    this.studentAddresses[0].studentId = this.studentId;

    console.log(this.studentAddresses)
    this.studentService.saveAddress(this.studentAddresses[0]).subscribe({
      next: response => {
        this.showMessage('Address Saved Successfully!', 'success')
      },
      error: (err) => this.showMessage(err.error?.errorMessage || 'Failed to save address!', 'error')
    });
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
}
