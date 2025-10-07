import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../service/manager-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-dashboard',
  imports: [CommonModule],
  templateUrl: './manager-dashboard.html',
  styleUrl: './manager-dashboard.css'
})
export class ManagerDashboard implements OnInit{
  managerId!: number;
  srmList: any[] = [];
  salesReps: any[] = [];
  leads: any[] = [];
  deals: any[] = [];
  error = '';
  success = '';

    constructor(private managerService: ManagerService) {}

  ngOnInit() {
    const id = localStorage.getItem('user_id');
    if (id) this.managerId = +id;
    this.loadData();
  }

  loadData() {
    this.loadSRMs();
    this.loadSalesReps();
    this.loadLeads();
    this.loadDeals();
  }

loadSRMs() {
  const managerId = localStorage.getItem('user_id'); 

  if (!managerId) {
    this.error = 'Manager ID not found. Please log in again.';
    return;
  }

  // debugger
  this.managerService.getSalesRepManagers(Number(managerId)).subscribe({
    next: (res) => {
      console.log('Full Response:', res);
      this.srmList = res;
      console.log('SRM List:', this.srmList);
    },
    error: (err) => {
      console.error(err);
      this.error = 'Failed to load SRMs.';
    }
  });
}

   loadLeads() {
    this.managerService.getLeads(this.managerId).subscribe({
      next: (res) => this.leads = res,
      error: () => this.error = 'Failed to load Leads.'
    });
  }

   loadSalesReps() {
    this.managerService.getSalesReps(this.managerId).subscribe({
      next: (res) => this.salesReps = res,
      error: () => this.error = 'Failed to load SalesReps.'
    });
  }
     loadDeals() {
    this.managerService.getDeals(this.managerId).subscribe({
      next: (res) => this.deals = res,
      error: () => this.error = 'Failed to load Deals.'
    });
  }

  approveDeal(dealId: number) {
    this.managerService.approveDeal(this.managerId, dealId).subscribe({
      next: () => {
        alert('Deal approved successfully!');
        this.loadDeals();
      },
      error: () => alert('Failed to approve deal.')
    });
  }
}
