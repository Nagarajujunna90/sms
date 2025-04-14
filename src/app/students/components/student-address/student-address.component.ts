import { Component } from '@angular/core';
import { StudentAddress } from '../../models/student-address.model';
import { StudentDataService } from '../../services/student-data.service';
import { StudentService } from '../../services/student.service';
import { MessageService } from '../../services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentResponse } from '../../models/studentResponse.model';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-student-address',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-address.component.html',
  styleUrl: './student-address.component.css'
})
export class StudentAddressComponent {
  student!: StudentResponse;
  studentAddresses: StudentAddress[] = [];

  studentId: number = 0;
  isEditMode = false;
  addressId: number = 0;

  constructor(
    private studentService: StudentService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private studentDataService: StudentDataService
  ) { }

  ngOnInit() {
    this.studentDataService.getStudentId$().subscribe(id => {
      if (id) {
        this.studentId = id;
      }
    });

    this.studentDataService.getAddressId$().subscribe(id => {
      if (id) {
        this.addressId = id;
      }
    });

    this.studentAddresses = this.getDefaultAddress();
    if (this.studentId && this.addressId) {
      this.studentService.getAddress(this.addressId).subscribe({
        next: (response) => {
          this.studentAddresses[0] = response;
          this.isEditMode = true;
        },
        error: (err) => {
          console.error('Failed to fetch address:', err);
        }
      });
    }

    this.student = this.studentDataService.getStudentData();
    if (this.student && this.student.studentAddresses && this.student.studentAddresses.length > 0) {
      this.studentAddresses = this.student.studentAddresses;
      this.addressId = this.studentAddresses[0].addressId;
      this.isEditMode = true;
    }
  }

  saveAddress() {
    this.studentAddresses[0].studentId = this.studentId;
    if (!this.isEditMode) {
      this.studentService.saveAddress(this.studentAddresses[0]).subscribe({
        next: (response) => {
          this.addressId = response.addressId;
          this.studentDataService.setAddressId(this.addressId);
          this.messageService.show('Saved successfully!', 'success');
        },
        error: (err) => {
          this.messageService.show('Something went wrong', 'error');
        }
      });
    } else {
      this.studentService.updateAddress(this.addressId, this.studentAddresses[0]).subscribe({
        next: (response) => {
          this.messageService.show('Updated successfully!', 'success');
        },
        error: (err) => {
          this.messageService.show('Something went wrong', 'error');
        }
      });
    }
  }

  getDefaultAddress(): StudentAddress[] {
    return [
      {
        addressId: 0,
        houseNumber: '',
        area: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        addressType: 'Permanent',
        landmark: '',
        studentId: 0
      }
    ];
  }

  // Check if the form is valid
  isFormValid(): boolean {
    const address = this.studentAddresses[0];
    return !!address.addressType && !!address.houseNumber && !!address.area && !!address.city && !!address.state && !!address.country && !!address.zipCode && /^\d{6}$/.test(address.zipCode);
  }

  clearForm() {
    this.studentAddresses = this.getDefaultAddress();
    this.isEditMode = false;
  }
}
