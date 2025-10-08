import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
interface DashboardData {
  totalLeads: number;
  activeDeals: number;
  wonDeals: number;
  totalRevenue: number;
  recentActivity: Array<{
    type: string;
    description: string;
    date: string;
  }>;
  leadsConversionRate: number;
  dealsClosingRate: number;
}

@Component({
  selector: 'app-salesrep-dashboard',
  imports: [CommonModule],
  templateUrl: './salesrep-dashboard.html',
  styleUrl: './salesrep-dashboard.css'
})
export class SalesrepDashboard implements OnInit {

  private apiUrl ='http://localhost:5264/api/SalesRep';
  dashboardData: DashboardData | null = null;
  salesRepId = 1;

  constructor(private http: HttpClient, private authService: AuthService) {}

   ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard(){
     this.http.get<DashboardData>(`${this.apiUrl}/dashboard?salesRepId=${this.salesRepId}`)
      .subscribe({
        next: (data) => this.dashboardData = data,
        error: (err) => console.error('Error loading dashboard:', err)
      });
  }

}
