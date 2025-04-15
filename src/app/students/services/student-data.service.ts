import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  private studentIdSubject = new BehaviorSubject<number | null>(
    sessionStorage.getItem('studentId') ? +sessionStorage.getItem('studentId')! : null
  );
  private addressIdSubject = new BehaviorSubject<number | null>(
    sessionStorage.getItem('addressId') ? +sessionStorage.getItem('addressId')! : null
  );
  private gradeIdSubject = new BehaviorSubject<number | null>(
    sessionStorage.getItem('gradeId') ? +sessionStorage.getItem('gradeId')! : null
  );
  private parentGuardianIdSubject = new BehaviorSubject<number | null>(
    sessionStorage.getItem('parentGuardianId') ? +sessionStorage.getItem('parentGuardianId')! : null
  );
  private previoursEducationIdSubject = new BehaviorSubject<number | null>(
    sessionStorage.getItem('previoursEducationId') ? +sessionStorage.getItem('previoursEducationId')! : null
  );

  // Student ID for document
  private documentIdSubject = new BehaviorSubject<number | null>(
    sessionStorage.getItem('documentId') ? +sessionStorage.getItem('documentId')! : null
  );
  getDocumentId$(): Observable<number | null> {
    return this.documentIdSubject.asObservable();
  }
  setDocumentId(id: number) {
    sessionStorage.setItem('documentId', id.toString());
    this.documentIdSubject.next(id);
  }
  getDocumentIdValue(): number | null {
    return this.documentIdSubject.getValue();
  }
    

  // Store full student data in memory only
  private studentData: any;

  setStudentData(data: any): void {
    this.studentData = data;
  }

  getStudentData(): any {
    return this.studentData;
  }

  // Student ID
  setStudentId(id: number) {
    sessionStorage.setItem('studentId', id.toString());
    this.studentIdSubject.next(id);
  }

  getStudentId$() {
    return this.studentIdSubject.asObservable();
  }

  getStudentIdValue(): number | null {
    return this.studentIdSubject.getValue();
  }

  // Address ID
  setAddressId(id: number) {
    sessionStorage.setItem('addressId', id.toString());
    this.addressIdSubject.next(id);
  }

  getAddressId$() {
    return this.addressIdSubject.asObservable();
  }

  getAddressIdValue(): number | null {
    return this.addressIdSubject.getValue();
  }

  // Grade ID
  setGradeId(id: number) {
    sessionStorage.setItem('gradeId', id.toString());
    this.gradeIdSubject.next(id);
  }

  getGradeId$() {
    return this.gradeIdSubject.asObservable();
  }

  getGradeIdValue(): number | null {
    return this.gradeIdSubject.getValue();
  }

  // Parent Guardian ID
  setParentGuardianId(id: number) {
    sessionStorage.setItem('parentGuardianId', id.toString());
    this.parentGuardianIdSubject.next(id);
  }

  getParentGuardianId$() {
    return this.parentGuardianIdSubject.asObservable();
  }

  getParentGuardianIdValue(): number | null {
    return this.parentGuardianIdSubject.getValue();
  }

  // Previous Education ID
  setPrevioursEducationId(id: number) {
    sessionStorage.setItem('previoursEducationId', id.toString());
    this.previoursEducationIdSubject.next(id);
  }

  getPrevioursEducationId$() {
    return this.previoursEducationIdSubject.asObservable();
  }

  getPrevioursEducationIdValue(): number | null {
    return this.previoursEducationIdSubject.getValue();
  }
}
