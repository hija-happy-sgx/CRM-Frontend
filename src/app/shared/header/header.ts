import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  encapsulation: ViewEncapsulation.None
})
export class Header implements OnInit {

  userName = '';
  userRole: string | null = null;
  menuItems: { label: string; route: string }[] = [];
  mobileMenuOpen = false;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
   this.userRole = this.authService.getRole();
   console.log('User role in header:', this.userRole);
  this.userName = this.authService.getUserName() || 'User';
  // this.setMenuItems();
  }

  logout(): void {
    this.authService.clearToken();
  this.route.navigate(['/login']);
    // Redirect to login page if needed
  }

  // setMenuItems() {
  //   const navLinks: Record<string, { label: string; route: string }[]> = {
  //     admin: [
  //       { label: 'Dashboard', route: '/admin/dashboard' },
  //       { label: 'Users', route: '/admin/users' },
  //       { label: 'Pipeline', route: '/admin/pipeline' },
  //       { label: 'Settings', route: '/admin/settings' }
  //     ],
  //     manager: [
  //       { label: 'Overview', route: '/manager/overview' },
  //       { label: 'Team', route: '/manager/team' },
  //       { label: 'Reports', route: '/manager/reports' }
  //     ],
  //     salesrep: [
  //       { label: 'Leads', route: '/sales/leads' },
  //       { label: 'Opportunities', route: '/sales/opportunities' },
  //       { label: 'Clients', route: '/sales/clients' }
  //     ],
  //     salesrep_manager: [
  //       { label: 'Dashboard', route: '/sales-manager/dashboard' },
  //       { label: 'Sales Team', route: '/sales-manager/team' },
  //       { label: 'Targets', route: '/sales-manager/targets' },
  //       { label: 'Reports', route: '/sales-manager/reports' }
  //     ]
  //   };

  //   this.menuItems = navLinks[this.userRole || ''] || [];
  // }
}
