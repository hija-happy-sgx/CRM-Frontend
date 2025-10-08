import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SrmService } from '../srm-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-salesrepmanager-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './salesrepmanager-dashboard.html',
  styleUrl: './salesrepmanager-dashboard.css'
})
export class SalesrepmanagerDashboard implements OnInit {
   managerId = 1; // Replace with logged-in manager's ID
  dashboard: any = {};
  salesReps: any[] = [];
  leads: any[] = [];
  deals: any[] = [];
  selectedRep: any = null;
  unassignedLeads: any[] = [];
  selectedLeadId: number | null = null;
pipelineStages: any[] = [];
  constructor(private service: SrmService) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.loadSalesReps();
    this.loadLeads();
    this.loadDeals();
      this.loadPipelineStages(); 
  }

  loadPipelineStages() {
  this.service.getPipelineStages().subscribe(res => {
    // API returns stages; map deals if needed
    this.pipelineStages = res.map((stage: any) => ({
      ...stage,
      deals: this.deals.filter(d => d.stageId === stage.stageId) // match deals to stage
    }));
  });
}


  loadDashboard() {
    this.service.getDashboard(this.managerId).subscribe(res => this.dashboard = res);
  }

  loadSalesReps() {
    this.service.getSalesReps(this.managerId).subscribe(res => this.salesReps = res);
  }

  loadLeads() {
    this.service.getTeamLeads(this.managerId).subscribe(res => {
      this.leads = res;
      this.unassignedLeads = this.leads.filter(l => !l.salesRepId);
    });
  }

  loadDeals() {
    this.service.getTeamDeals(this.managerId).subscribe(res => this.deals = res);
  }

  openAssignLeadModal(rep: any) {
    this.selectedRep = rep;
    this.selectedLeadId = this.unassignedLeads.length ? this.unassignedLeads[0].id : null;
    const checkbox = document.getElementById('assignLeadModal') as HTMLInputElement;
    checkbox.checked = true;
  }

  assignLead() {
    if (!this.selectedLeadId) return;
    this.service.assignLead(this.managerId, this.selectedLeadId, this.selectedRep.id)
      .subscribe(() => {
        alert('Lead assigned successfully!');
        this.loadLeads();
        this.loadSalesReps();
        const checkbox = document.getElementById('assignLeadModal') as HTMLInputElement;
        checkbox.checked = false;
      });
  }
}

