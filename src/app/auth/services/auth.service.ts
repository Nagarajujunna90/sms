import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:6062/auth/login'; // Replace with your API

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<AuthResponse>(this.apiUrl, credentials).pipe(
      tap(response => {
        console.log(response)
        localStorage.setItem('authToken', response.accessToken); // ✅ Save Token
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken'); // ✅ Remove Token on Logout
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
