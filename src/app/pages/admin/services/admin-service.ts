import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
   private baseUrl = 'http://localhost:5264/api/admin';

   constructor(private http: HttpClient) { }

   private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

    getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`,this.getAuthHeaders());
  }

  getAllManagers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/managers`, this.getAuthHeaders());
  }
  getAllSalesRepManagers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/salesrepmanagers`, this.getAuthHeaders());
  }
  getAllSalesRep(): Observable<any> {
    return this.http.get(`${this.baseUrl}/salesrep`, this.getAuthHeaders());
  }

    createManager(dto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/manager`, dto, this.getAuthHeaders());
  }

  createSalesRepManager(managerId: number, dto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/srm/${managerId}`, dto, this.getAuthHeaders());
  }

  createSalesRep(srmId: number, dto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/salesrep/${srmId}`, dto, this.getAuthHeaders());
  }

  updateUser(role: string, id: number, dto: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${role}/${id}`, dto, this.getAuthHeaders());
  }

  deleteUser(role: string, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${role}/${id}`, this.getAuthHeaders());
  }

  // Pipeline stages
  getPipelineStages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pipeline-stages`, this.getAuthHeaders());
  }

 addPipelineStage(dto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pipeline-stage`, dto, this.getAuthHeaders());
  }
}
