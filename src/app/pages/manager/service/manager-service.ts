import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getSalesReps(managerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/salesreps?managerId=${managerId}`, this.getAuthHeaders());
  }

  getLeads(managerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/leads?managerId=${managerId}`, this.getAuthHeaders());
  }

  getDeals(managerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/deals?managerId=${managerId}`, this.getAuthHeaders());
  }

  approveDeal(managerId: number, dealId: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/deal/${dealId}/approve?managerId=${managerId}`, {}, this.getAuthHeaders());
  }
}
