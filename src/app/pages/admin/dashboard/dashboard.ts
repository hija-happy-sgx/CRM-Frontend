import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin-service';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  role: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

   users: any[] = [];
  stages: any[] = [];
  totalUsers = 0;
  totalManagers = 0;
  totalSalesReps = 0;
  totalStages = 0;
  error = ''

  constructor(private adminService: AdminService){}
  ngOnInit(): void {
    this.loadUsers();
    this.loadPipelineStages();
  }

   loadUsers() {
    debugger
    this.adminService.getAllUsers().subscribe({
      next: (res) => {
        this.users = Array.isArray(res) ? res : res.data || [];
        this.totalUsers = this.users.length;
        this.totalManagers = this.users.filter(u => u.role === 'Manager').length;
        this.totalSalesReps = this.users.filter(u => u.role === 'SalesRep').length;
      },
      error: (err) => {
        console.error('Error loading users', err);
        this.error = 'Failed to load users';
        this.users = []; // fallback
      }
    });
  }

  loadPipelineStages() {
    this.adminService.getPipelineStages().subscribe({
      next: (res) => {
        this.stages = Array.isArray(res) ? res : res.data || [];
        this.totalStages = this.stages.length;
      },
      error: (err) => {
        console.error('Error loading stages', err);
        this.error = 'Failed to load pipeline stages';
          this.stages = [];
      }
    });
  }

  deleteUser(user: any) {
    if(confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.adminService.deleteUser(user.role, user.id).subscribe(() => {
        this.loadUsers();
      });
    }

  }
}
