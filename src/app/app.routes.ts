import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { authGuardGuard } from './core/guards/auth-guard-guard';
import { UserManagement } from './pages/admin/user-management/user-management';

export const routes: Routes = [
    // {path: '', redirectTo: 'login', pathMatch: 'full',component: Login},
    //   { path: 'login', component: Login },
      
    
//   { path: 'login/:role', component: Login },
//   { path: '', redirectTo: 'login/admin', pathMatch: 'full' },
//   {path:'admin/dashboard', component: Dashboard}


    { path: '', redirectTo: 'login/admin', pathMatch: 'full' },

  // Login routes
  { path: 'login/:role', component: Login },

  // Admin routes
  {
    path: 'admin/dashboard',
    component: Dashboard,
    canActivate: [authGuardGuard] // Uncomment when AuthGuard is implemented
  },
  { 
    path: 'admin/users', 
    component: UserManagement, 
    canActivate: [authGuardGuard] 
  },




];
