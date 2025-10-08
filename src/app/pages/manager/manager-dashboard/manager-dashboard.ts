import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerService, SalesRepManager, SalesRep, Lead, Deal } from '../manager-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-dashboard.html',
  styleUrls: ['./manager-dashboard.css']
})
export class ManagerDashboard implements OnInit {
  managerId!: number;
  loading: boolean = false;

  salesRepManagers: SalesRepManager[] = [];
  salesReps: SalesRep[] = [];
  leads: Lead[] = [];
  deals: Deal[] = [];

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('user_id');
    console.log('Manager ID from localStorage:', id);
    if (!id) {
      alert('Manager ID not found. Please log in.');
      return;
    }
    this.managerId = +id;
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.fetchSalesRepManagers();
    this.fetchSalesReps();
    this.fetchLeads();
    this.fetchDeals();
  }

  fetchSalesRepManagers(): void {
    this.loading = true;
    this.managerService.getSalesRepManagers(this.managerId).subscribe({
      next: (data) => {
        this.salesRepManagers = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching SRMs:', err);
        this.loading = false;
      }
    });
  }

  fetchSalesReps(): void {
    this.loading = true;
    this.managerService.getSalesReps(this.managerId).subscribe({
      next: (data) => {
        this.salesReps = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching Sales Reps:', err);
        this.loading = false;
      }
    });
  }

  fetchLeads(): void {
    this.loading = true;
    this.managerService.getLeads(this.managerId).subscribe({
      next: (data) => {
        this.leads = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching leads:', err);
        this.loading = false;
      }
    });
  }

  fetchDeals(): void {
    this.loading = true;
    this.managerService.getDeals(this.managerId).subscribe({
      next: (data) => {
        this.deals = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching deals:', err);
        this.loading = false;
      }
    });
  }

  get pendingDealsCount(): number {
    return this.deals.filter(d => !d.approved).length;
  }

  get totalLeadsValue(): number {
    return this.leads.reduce((sum, lead) => sum + (lead.value || 0), 0);
  }
}
