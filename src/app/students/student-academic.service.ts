import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentAcademicService {
  private apiUrl = 'http://localhost:8080/students/academic'; // Adjust API URL based on backend

  constructor(private http: HttpClient) {}

  addAcademicDetails(details: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, details);
  }
}
