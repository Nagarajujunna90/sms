// student-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  private studentIdSubject = new BehaviorSubject<number | null>(null);

  setStudentId(id: number) {
    this.studentIdSubject.next(id);
  }

  getStudentId$() {
    return this.studentIdSubject.asObservable();
  }

  getStudentIdValue(): number | null {
    return this.studentIdSubject.getValue();
  }
}
