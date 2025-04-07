import { Component } from '@angular/core';
import { StudentAcademicService } from '../student-academic.service';
import { SharedModule } from '../../shared/shared.module';
import { AcademicDetails } from '../../models/AcademicDetails.model';

@Component({
  selector: 'app-student-academic-details',
  imports: [SharedModule],
  templateUrl: './student-academic-details.component.html',
  styleUrls: ['./student-academic-details.component.css']
})

export class StudentAcademicDetailsComponent {
  message = '';
  academicDetails: AcademicDetails | null = null;  
  constructor(private studentAcademicService: StudentAcademicService) {}
  onSubmit() {
    this.studentAcademicService.addAcademicDetails(this.academicDetails).subscribe({
      next: (response) => {
        this.message = 'Student academic details added successfully!';
      },
      error: (err) => {
        this.message = 'Error adding student academic details!';
        console.error(err);
      }
    });
  }
}
