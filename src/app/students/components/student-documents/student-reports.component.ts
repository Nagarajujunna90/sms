import { Component } from '@angular/core';
import { StudentDataService } from '../../services/student-data.service';
import { StudentService } from '../../services/student.service';
import { MessageService } from '../../services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentResponse } from '../../models/studentResponse.model';
import { SharedModule } from '../../../shared/shared.module';
import { StudentDocument } from '../../models/student-documents.model';

@Component({
  selector: 'app-student-document',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-documents.component.html',
  styleUrls: ['./student-documents.component.css']
})
export class StudentDocumentComponent {
  student!: StudentResponse;
  studentDocuments: StudentDocument[] = [];
  studentId: number = 0;
  isEditMode = false;
  documentId: number = 0;

  constructor(
    private studentService: StudentService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private studentDataService: StudentDataService
  ) {}

  ngOnInit() {
    this.studentDataService.getStudentId$().subscribe(id => {
      if (id) {
        this.studentId = id;
      }
    });

    this.studentDataService.getDocumentId$().subscribe(id => {
      if (id) {
        this.documentId = id;
      }
    });

    this.studentDocuments = this.getDefaultDocument();
    if (this.studentId && this.documentId) {
      this.studentService.getDocument(this.documentId).subscribe({
        next: (response) => {
          this.studentDocuments[0] = response;
          this.isEditMode = true;
        },
        error: (err) => {
          console.error('Failed to fetch document:', err);
        }
      });
    }

    this.student = this.studentDataService.getStudentData();
    if (this.student && this.student.studentDocuments && this.student.studentDocuments.length > 0) {
      this.documentId = this.studentDocuments[0].documentId;
      this.isEditMode = true;
    }
  }

  saveDocument() {
    this.studentDocuments[0].studentId = this.studentId;
    if (!this.isEditMode) {
      this.studentService.saveDocument(this.studentDocuments[0]).subscribe({
        next: (response) => {
          this.documentId = response.documentId;
          this.studentDataService.setDocumentId(this.documentId);
          this.messageService.showMessage('Saved successfully!', 'success');
        },
        error: (err) => {
          this.messageService.showMessage('Something went wrong', 'error');
        }
      });
    } else {
      this.studentService.updateDocument(this.documentId, this.studentDocuments[0]).subscribe({
        next: (response) => {
          this.messageService.showMessage('Updated successfully!', 'success');
        },
        error: (err) => {
          this.messageService.showMessage('Something went wrong', 'error');
        }
      });
    }
  }

  getDefaultDocument(): StudentDocument[] {
    return [
      {
        documentId: 0,
        documentType: '',
        documentUrl: '',
        documentDate: '',
        studentId: 0
      }
    ];
  }

  // Check if the form is valid
  isFormValid(): boolean {
    const document = this.studentDocuments[0];
    return !!document.documentType && !!document.documentUrl && !!document.documentDate;
  }

  clearForm() {
    this.studentDocuments = this.getDefaultDocument();
    this.isEditMode = false;
  }
}
