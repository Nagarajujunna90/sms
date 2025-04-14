import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentPersonalInfo } from '../models/student-personal-info.model';
import { StudentAddress } from '../models/student-address.model';
import { StudentParentGardians } from '../models/student-parent-guardians.models';
import { StudentPreviousAcademicDetails } from '../models/student-previous-academic.model';
import { StudentGrade } from '../models/student-current-academic.model';
import { StudentResponse } from '../models/studentResponse.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  private baseUrl = 'http://localhost:6063/ems/v1';

  constructor(private http: HttpClient) {}

  // 🔐 Common Headers
  private getHeaders() {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // 📌 PERSONAL INFO
  savePersonalInfo(data: StudentPersonalInfo): Observable<StudentPersonalInfo> {
    return this.http.post<StudentPersonalInfo>(`${this.baseUrl}/personal/student`, data, { headers: this.getHeaders() });
  }

  getStudentById(id: number): Observable<StudentPersonalInfo> {
    return this.http.get<StudentPersonalInfo>(`${this.baseUrl}/personal/student/${id}`, { headers: this.getHeaders() });
  }

  updateStudent(id: number, student: StudentPersonalInfo): Observable<StudentPersonalInfo> {
    return this.http.put<StudentPersonalInfo>(`${this.baseUrl}/personal/student/${id}`, student, { headers: this.getHeaders() });
  }

  getStudentResponseById(id: number): Observable<StudentResponse> {
    return this.http.get<StudentResponse>(`${this.baseUrl}/personal/student/${id}`, { headers: this.getHeaders() });
  }

  getStudents(): Observable<StudentPersonalInfo[]> {
    return this.http.get<StudentPersonalInfo[]>(`${this.baseUrl}/personal/student/students`, { headers: this.getHeaders() });
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/personal/student/${id}`, { headers: this.getHeaders() });
  }

  getStudentsByFilter(filters: any): Observable<any[]> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });
    return this.http.get<any[]>(`${this.baseUrl}/student/search`, { headers: this.getHeaders(), params });
  }

  // 🏠 ADDRESS
  saveAddress(data: StudentAddress): Observable<StudentAddress> {
    return this.http.post<StudentAddress>(`${this.baseUrl}/student/addresses`, data, { headers: this.getHeaders() });
  }

  getAddress(studentId: number): Observable<StudentAddress> {
    return this.http.get<StudentAddress>(`${this.baseUrl}/student/addresses/${studentId}`, { headers: this.getHeaders() });
  }

  updateAddress(studentId: number, address: StudentAddress): Observable<StudentAddress> {
    return this.http.put<StudentAddress>(`${this.baseUrl}/student/addresses/${studentId}`, address, { headers: this.getHeaders() });
  }

  // 🎓 GRADE
  saveGrade(data: StudentGrade): Observable<StudentGrade> {
    return this.http.post<StudentGrade>(`${this.baseUrl}/student/grade`, data, { headers: this.getHeaders() });
  }

  getGrade(studentId: number): Observable<StudentGrade> {
    return this.http.get<StudentGrade>(`${this.baseUrl}/student/grade/${studentId}`, { headers: this.getHeaders() });
  }

  // 👨‍👩‍👧‍👦 PARENT INFO (Supports multiple entries)
  saveParentInfo(data: StudentParentGardians): Observable<StudentParentGardians> {
    return this.http.post<StudentParentGardians>(`${this.baseUrl}/student/parent-guardians`, data, { headers: this.getHeaders() });
  }

  getParentInfo(studentId: number): Observable<StudentParentGardians> {
    return this.http.get<StudentParentGardians>(`${this.baseUrl}/student/parent-guardians/${studentId}`, { headers: this.getHeaders() });
  }

  getAllParentGuardiansById(id: number): Observable<StudentParentGardians[]> {
    return this.http.get<StudentParentGardians[]>(`${this.baseUrl}/student/parent-guardians/student/${id}`, { headers: this.getHeaders() });  

  }
deleteParentGuardian(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/student/parent-guardians/${id}`, { headers: this.getHeaders() });    
  }

  // 📚 PREVIOUS EDUCATION
  savePreviousEducation(data: StudentPreviousAcademicDetails): Observable<StudentPreviousAcademicDetails> {
    return this.http.post<StudentPreviousAcademicDetails>(`${this.baseUrl}/student/academic`, data, { headers: this.getHeaders() });
  }

  getPreviousEducation(educationId: number): Observable<StudentPreviousAcademicDetails> {
    return this.http.get<StudentPreviousAcademicDetails>(`${this.baseUrl}/student/academic/${educationId}`, { headers: this.getHeaders() });
  }
  getAllPreviousEducations(studentId: number): Observable<StudentPreviousAcademicDetails[]> {
    return this.http.get<StudentPreviousAcademicDetails[]>(`${this.baseUrl}/student/academic/student/${studentId}`, { headers: this.getHeaders() });
  }
  deletePreviousEducation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/student/academic/${id}`, { headers: this.getHeaders() });
  }
}
