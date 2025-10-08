import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SrmService {
   private baseUrl = 'https://localhost:7264/api/SalesRepManager';

  constructor(private http: HttpClient) {}

  getDashboard(managerId: number) {
    return this.http.get(`${this.baseUrl}/${managerId}/dashboard`);
  }

  getSalesReps(managerId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/${managerId}/salesreps`);
  }

  getTeamLeads(managerId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/${managerId}/leads`);
  }

  getTeamDeals(managerId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/${managerId}/deals`);
  }

  getPipelineStages() {
  return this.http.get<any[]>(`https://localhost:7264/api/pipeline`);
}

  assignLead(managerId: number, leadId: number, salesRepId: number) {
    return this.http.post(`${this.baseUrl}/${managerId}/assignlead/${leadId}/${salesRepId}`, {});
  }
}
