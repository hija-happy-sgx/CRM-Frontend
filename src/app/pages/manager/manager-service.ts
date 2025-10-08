import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SalesRepManager {
  id: number;
  name: string;
  email: string;
  teamSize: number;
  status: string;
}

export interface SalesRep {
  id: number;
  name: string;
  managerName: string;
  managerId: number;
  leadCount: number;
  dealCount: number;
}

export interface Lead {
  id: number;
  name: string;
  company: string;
  assignedTo: string;
  status: string;
  value: number;
}

export interface Deal {
  id: number;
  customer: string;
  salesRep: string;
  amount: number;
  stage: string;
  approved: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private baseUrl = 'http://localhost:5264/api/Manager';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getSalesRepManagers(managerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/salesrepmanagers?managerId=${managerId}`, this.getAuthHeaders());
  }


  // from backedn directy
// var managerId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

// [HttpGet("salesrepmanagers")]
// public async Task<IActionResult> GetSalesRepManagers()
// {
//     var managerId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
//     var result = await _managerService.GetSalesRepManagersAsync(managerId);
//     return Ok(result);
// }

// 2️ Assign SalesRep Manager to Manager
  assignSalesRepManager(managerId: number, srmId: number): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(
      `${this.baseUrl}/salesrepmanager/assign?managerId=${managerId}&srmId=${srmId}`, this.getAuthHeaders(),
    );
  }

  // 3️List all SalesReps under their SalesRep Managers
  getSalesReps(managerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/salesreps?managerId=${managerId}`, this.getAuthHeaders());
  }

   // 4️ Reassign SalesRep to another SRM
  reassignSalesRep(salesRepId: number, newSrmId: number): Observable<{ success: boolean }> {
    return this.http.patch<{ success: boolean }>(
      `${this.baseUrl}/salesrep/reassign?salesRepId=${salesRepId}&newSrmId=${newSrmId}`,
      this.getAuthHeaders()
    );
  }

  // $ List alll leads under thoer SRMs
  getLeads(managerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/leads?managerId=${managerId}`, this.getAuthHeaders());
  }

  // 6️ List all deals under their SRMs
  getDeals(managerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/deals?managerId=${managerId}`, this.getAuthHeaders());
  }

  // 7️ Approve deal stage changes or discounts
  approveDeal(managerId: number, dealId: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/deal/${dealId}/approve?managerId=${managerId}`, {}, this.getAuthHeaders());
  }
}
