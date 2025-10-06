import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'] // fixed typo
})
export class Login implements OnInit {
  email = '';
  password = '';
  role = 'Admin'; // default role
  error = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  onLogin() {
    const payload = {
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.login(payload).subscribe({
      next: (res) => {
       localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('user_id', res.user_id.toString());

        console.log('Login successful', res);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        console.error('Login failed', err);
  this.error = `Invalid credentials or server error: ${err.message}`;      },
    });
  }
}
