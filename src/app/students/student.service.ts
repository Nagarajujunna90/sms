import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { Address } from '../models/Address.model';
import { AcademicDetails } from '../models/AcademicDetails.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  private apiUrl = 'http://localhost:6063/ems/v1/personal/student'; // Update API endpoint

  constructor(private http: HttpClient) {}

  savePersonalInfo(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student, { headers: this.getHeaders() });
  }


 // 🔹 Save Address
 saveAddress(address: any): Observable<Address> {
  return this.http.post<Address>('http://localhost:6063/ems/v1/student/addresses', address,{ headers: this.getHeaders() });
}

// 🔹 Save Grade Details
saveGradeDetails(data: any): Observable<any> {
  return this.http.post('http://localhost:6063/ems/v1/student/academic', data,{ headers: this.getHeaders() });
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

  updateStudent(id: number, student: Student): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, student, { headers: this.getHeaders()});
  }
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl+'/students', { headers: this.getHeaders() });
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
