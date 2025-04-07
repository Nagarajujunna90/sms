import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, HttpClientModule]  // Import HttpClientModule
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  private router = inject(Router);   // Inject Router
  constructor(private authService: AuthService) {}

  onSubmit() {

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/dashboard']), // ✅ Navigate after login
      error: err => alert('Login failed: ' + err.message)
    });

  }
}