import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';


@Component({
  selector: 'app-header',
  imports: [MenubarModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
   encapsulation: ViewEncapsulation.None
})
export class Header {

  userName: string | null = '';

  // constructor(private authService: AuthService, private router: Router) {}

  // ngOnInit(): void {
  //   this.userName = this.authService.getUserName(); // Get logged-in user
  // }

  // logout(): void {
  //   this.authService.logout();
  //   this.router.navigate(['/auth/login']);
  // }

  logout(): void {
    alert('Logout functionality to be implemented.');
  }

}
