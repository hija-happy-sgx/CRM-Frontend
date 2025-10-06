import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  // login(dto: { email: string; password: string; role: string }): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/login`, dto);
  // }
   login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, data);
  }

  // register(dto: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/register`, dto);
  // }

  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}
