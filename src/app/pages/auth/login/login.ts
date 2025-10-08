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

roles: string[] = ['Admin', 'Manager', 'SalesRepManager', 'SalesRep']; // Dropdown roles


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
        console.log(res)
        if (res && res.token) {
          this.authService.saveToken(res.token, res.role, res.user_id);
          localStorage.setItem('user_id', res.user_id.toString());

          alert(`Welcome ${res.role}! Login successful.`);
          this.router.navigate([`/${res.role.toLowerCase()}/dashboard`]);
        } else {
          alert('Unexpected response from server.');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        // Show a nice error message
        if (err.status === 401 || err.status === 403) {
          alert(`Invalid ${this.role} credentials. Please try again.`);
        } else {
          alert('Server error. Please try again later.');
        }
      },
    });
  }
}
