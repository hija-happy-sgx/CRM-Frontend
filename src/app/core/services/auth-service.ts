import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

interface LoginRequest {
  email: string;
  password: string;
  role: string;
}

interface LoginResponse {
  token: string;
  role: string;
  user_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5264/api/Auth/login';

  
  // Role management
  private roleSubject = new BehaviorSubject<string | null>(null);
  role$ = this.roleSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) { }

  


  // login(dto: { email: string; password: string; role: string }): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/login`, dto);
  // }
   login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, data);
  }

  // register(dto: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/register`, dto);
  // }

 saveToken(token: string, role: string, userName: string) {
  localStorage.setItem('authToken', token);
  localStorage.setItem('role', role);
  localStorage.setItem('userName', userName);
  this.roleSubject.next(role);
}

getUserName(): string | null {
  return localStorage.getItem('userName');
}
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getRole(): string | null {
    return this.roleSubject.value || localStorage.getItem('role');
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    this.roleSubject.next(null);
    
  }

   clearToken() {
    this.logout(); // call logout logic
  }
}
