import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon?: string; // Optional: for icons
  route?: string;
  role?: string[]; // Roles that can see this item
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  role: string = 'Admin'; // Replace with AuthService later

  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    // Define sidebar menu items with role access
    this.menuItems = [
      { label: 'Dashboard', route: '/dashboard', role: ['Admin', 'Manager', 'SalesRep', 'SRM'], icon: '🏠' },
      { label: 'Users', route: '/admin/users', role: ['Admin'], icon: '👤' },
      { label: 'Roles', route: '/admin/roles', role: ['Admin'], icon: '🔑' },
      { label: 'Team Leads', route: '/manager/team-leads', role: ['Manager', 'SRM'], icon: '📋' },
      { label: 'My Leads', route: '/sales-rep/my-leads', role: ['SalesRep'], icon: '📄' },
      { label: 'Deals', route: '/sales-rep/deals', role: ['SalesRep', 'Manager'], icon: '💼' },
      { label: 'Pipeline', route: '/pipeline', role: ['Admin', 'Manager', 'SalesRep'], icon: '📊' },
      { label: 'Communication Logs', route: '/communication-log', role: ['Admin', 'Manager'], icon: '✉️' }
    ];
  }
}
