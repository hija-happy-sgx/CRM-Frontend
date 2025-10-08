import { Component, OnInit } from '@angular/core';
import { Deal, Lead, ManagerService, SalesRep, SalesRepManager } from '../manager-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports implements OnInit {
  activeTab: string = 'dashboard';
  managerId: number = 0;
  loading: boolean = false;

  salesRepManagers: SalesRepManager[] = [];
  salesReps: SalesRep[] = [];
  leads: Lead[] = [];
  deals: Deal[] = [];

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id) {
      this.managerId = parseInt(id, 10);
      console.log('Manager ID:', this.managerId);
      this.fetchDeals();
    } else {
      console.error('Manager ID not found in localStorage');
    }
  }

  fetchDeals(): void {
    this.loading = true;
    this.managerService.getDeals(this.managerId).subscribe({
      next: (data) => {
        this.deals = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching deals:', error);
        this.loading = false;
        alert('Failed to fetch Deals');
      }
    });
  }

  approveDeal(dealId: number): void {
    if (!confirm('Are you sure you want to approve this deal?')) return;

    this.managerService.approveDeal(this.managerId, dealId).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Deal approved successfully!');
          this.fetchDeals();
        } else {
          alert('Failed to approve deal');
        }
      },
      error: (error) => {
        console.error('Error approving deal:', error);
        alert('Failed to approve deal');
      }
    });
  }
}
