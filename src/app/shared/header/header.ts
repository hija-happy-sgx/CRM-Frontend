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

  constructor(private authService: AuthService, private router: Router) {}

  
   ngOnInit(): void {
    // Subscribe to role changes
    this.authService.role$.subscribe(role => {
      this.userRole = role;
      this.setMenuItems();
    });

    // Set userName from localStorage
    this.userName = this.authService.getUserName() || 'User';

    // Initial menu items (in case role is already saved in localStorage)
    this.userRole = this.authService.getRole();
    this.setMenuItems();
  }

  logout(): void {
    this.authService.clearToken();
    this.userRole = null;  // Clear role
    this.userName = '';
    this.setMenuItems();   // Reset navbar
    this.router.navigate(['/login']);
  }

  
  setMenuItems(): void {
    const navLinks: Record<string, { label: string; route: string }[]> = {
      Admin: [
        { label: 'Dashboard', route: '/admin/dashboard' },
        { label: 'Users', route: '/admin/users' },
        { label: 'Pipeline', route: '/admin/pipeline' },
        { label: 'Settings', route: '/admin/settings' }
      ],
      Manager: [
        { label: 'Dashboard', route: '/manager/dashboard' },
        { label: 'Sales Team', route: '/manager/team' },
        { label: 'Targets', route: '/manager/targets' },
        { label: 'Reports', route: '/manager/reports' }
      ],
      SalesRep: [
        { label: 'Dashboard', route: '/sr/dashboard' },
        { label: 'Leads', route: '/sr/leads' },
        { label: 'Opportunites', route: '/sr/opportunities' }
      ],
      SalesRepManager: [
        { label: 'Dashboard', route: '/sales-manager/dashboard' },
        { label: 'Sales Team', route: '/sales-manager/team' },
        { label: 'Targets', route: '/sales-manager/targets' },
        { label: 'Reports', route: '/sales-manager/reports' }
      ],
      default: [
        { label: 'Home', route: '/' },
        { label: 'Login', route: '/login' }
      ]
    };

     this.menuItems = navLinks[this.userRole || 'default'] || navLinks['default'];
  }
}
