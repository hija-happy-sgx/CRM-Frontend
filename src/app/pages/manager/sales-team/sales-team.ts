import { Component, OnInit } from '@angular/core';
import { ManagerService, SalesRepManager, SalesRep } from '../manager-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales-team',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales-team.html',
  styleUrls: ['./sales-team.css']
})
export class SalesTeamComponent implements OnInit {
  managerId!: number; // will be set from localStorage
  loading: boolean = false;

  salesRepManagers: SalesRepManager[] = [];
  salesReps: SalesRep[] = [];

  // Modal states
  showAssignModal: boolean = false;
  showReassignModal: boolean = false;
  selectedSalesRep: SalesRep | null = null;
  selectedSRM: string = '';
  newSrmId: string = '';

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('user_id');
    if (!id) {
      alert('Manager ID not found. Please log in.');
      return;
    }
    this.managerId = +id; // convert string to number

    this.fetchSalesRepManagers();
    this.fetchSalesReps();
  }

  fetchSalesRepManagers(): void {
    this.loading = true;
    this.managerService.getSalesRepManagers(this.managerId).subscribe({
      next: (data) => {
        this.salesRepManagers = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching SRMs:', error);
        this.loading = false;
        alert('Failed to fetch Sales Rep Managers');
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
      error: (error) => {
        console.error('Error fetching Sales Reps:', error);
        this.loading = false;
        alert('Failed to fetch Sales Reps');
      }
    });
  }

  assignSalesRepManager(): void {
    if (!this.newSrmId) {
      alert('Please enter a valid SRM ID');
      return;
    }

    this.managerService.assignSalesRepManager(this.managerId, +this.newSrmId).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Sales Rep Manager assigned successfully!');
          this.fetchSalesRepManagers();
          this.closeAssignModal();
        } else {
          alert('Failed to assign Sales Rep Manager');
        }
      },
      error: (error) => {
        console.error('Error assigning SRM:', error);
        alert('Failed to assign Sales Rep Manager');
      }
    });
  }

  reassignSalesRep(): void {
    if (!this.selectedSalesRep || !this.selectedSRM) {
      alert('Please select a valid SRM ID');
      return;
    }

    this.managerService.reassignSalesRep(this.selectedSalesRep.id, +this.selectedSRM).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Sales Rep reassigned successfully!');
          this.fetchSalesReps();
          this.closeReassignModal();
        } else {
          alert('Failed to reassign Sales Rep');
        }
      },
      error: (error) => {
        console.error('Error reassigning Sales Rep:', error);
        alert('Failed to reassign Sales Rep');
      }
    });
  }

  openAssignModal(): void {
    this.showAssignModal = true;
    this.newSrmId = '';
  }

  closeAssignModal(): void {
    this.showAssignModal = false;
    this.newSrmId = '';
  }

  openReassignModal(salesRep: SalesRep): void {
    this.selectedSalesRep = salesRep;
    this.showReassignModal = true;
    this.selectedSRM = '';
  }

  closeReassignModal(): void {
    this.showReassignModal = false;
    this.selectedSalesRep = null;
    this.selectedSRM = '';
  }
}
