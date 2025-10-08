import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  dashboardData: DashboardData | null = null;
  salesRepId = 1;

  constructor(private http: HttpClient) {}

   ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard(){
     this.http.get<DashboardData>(`/api/SalesRep/dashboard?salesRepId=${this.salesRepId}`)
      .subscribe({
        next: (data) => this.dashboardData = data,
        error: (err) => console.error('Error loading dashboard:', err)
      });
  }

}
