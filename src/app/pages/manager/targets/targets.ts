import { Component, OnInit } from '@angular/core';
import { ManagerService, Lead } from '../manager-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-targets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './targets.html',
  styleUrls: ['./targets.css']
})
export class TargetsComponent implements OnInit {
  leads: Lead[] = [];
  loading: boolean = false;
  managerId: number = 1; // Replace with actual user ID from auth/localStorage

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('user_id');
    if (id) this.managerId = +id;

    this.fetchLeads();
  }

  fetchLeads(): void {
    this.loading = true;
    this.managerService.getLeads(this.managerId).subscribe({
      next: (data) => {
        this.leads = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching leads:', error);
        this.loading = false;
        alert('Failed to fetch leads.');
      }
    });
  }

  getLeadBadgeClass(status: string): string {
    switch(status?.toLowerCase()) {
      case 'hot': return 'badge-error';
      case 'warm': return 'badge-warning';
      case 'cold': return 'badge-info';
      default: return 'badge-info';
    }
  }
}
