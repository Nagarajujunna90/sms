// student-data.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StudentPersonalInfo } from '../models/student-personal-info.model';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  private studentIdSubject = new BehaviorSubject<number | null>(null);
  private addressIdSubject = new BehaviorSubject<number | null>(null);
  private gradeIdSubject=new BehaviorSubject<number | null>(null);
  private parentGuardianIdSubject=new BehaviorSubject<number | null>(null);
  private previoursEducationIdSubject=new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:6063/ems/v1/personal/student'; // Update API endpoint

   getStudentById(id: number): Observable<StudentPersonalInfo> {
     return this.http.get<StudentPersonalInfo>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
   }
   private getHeaders() {
    const token = localStorage.getItem('authToken'); // ✅ Get token from local storage
    console.log(token)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // 
    });
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
   
  }

  private studentData: any;

  setStudentData(data: any): void {
    this.studentData = data;
  }

  getStudentData(): any {
    return this.studentData;
  }

  //set studentId
  setStudentId(id: number) {
    this.studentIdSubject.next(id);
  }

  getStudentId$() {
    return this.studentIdSubject.asObservable();
  }

  getStudentIdValue(): number | null {
    return this.studentIdSubject.getValue();
  }

  //set addressId
  setAddressId(id: number) {
    this.addressIdSubject.next(id);
  }

  getAddressId$() {
    return this.addressIdSubject.asObservable();
  }

  getAddressIdValue(): number | null {
    return this.addressIdSubject.getValue();
  }
 //set gradeId
 setGradeId(id: number) {
  this.gradeIdSubject.next(id);
}

getGradeId$() {
  return this.gradeIdSubject.asObservable();
}

getGradeIdValue(): number | null {
  return this.gradeIdSubject.getValue();
}
 //set parentGuardianId
 setParentGuardianId(id: number) {
  this.parentGuardianIdSubject.next(id);
}

getParentGuardianId$() {
  return this.parentGuardianIdSubject.asObservable();
}

getParentGuardianIdValue(): number | null {
  return this.parentGuardianIdSubject.getValue();
}

  //set previoursEducationId
  setPrevioursEducationId(id: number) {
    this.previoursEducationIdSubject.next(id);
  }

  getPrevioursEducationId$() {
    return this.previoursEducationIdSubject.asObservable();
  }

  getPrevioursEducationIdValue(): number | null {
    return this.previoursEducationIdSubject.getValue();
  }

}
