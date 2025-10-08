import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { UserManagement } from './pages/admin/user-management/user-management';
import { SalesrepmanagerDashboard } from './pages/salesrepmanager/salesrepmanager-dashboard/salesrepmanager-dashboard';
import { SalesrepDashboard } from './pages/salesrep/salesrep-dashboard/salesrep-dashboard';
import { authGuard } from './core/guards/auth-guard-guard';
import { TargetsComponent } from './pages/manager/targets/targets';
import { Reports } from './pages/manager/reports/reports';
import { SalesTeamComponent } from './pages/manager/sales-team/sales-team';
import { ManagerDashboard } from './pages/manager/manager-dashboard/manager-dashboard';
import { Leads } from './pages/salesrep/leads/leads';
import { Opportunities } from './pages/salesrep/opportunities/opportunities';

export const routes: Routes = [
    // {path: '', redirectTo: 'login', pathMatch: 'full',component: Login},
    //   { path: 'login', component: Login },
      
    
//   { path: 'login/:role', component: Login },
//   { path: '', redirectTo: 'login/admin', pathMatch: 'full' },
//   {path:'admin/dashboard', component: Dashboard}


    { path: '', redirectTo: 'login/admin', pathMatch: 'full' },
{ path: 'login', component: Login },

  // Login routes
  { path: 'login/:role', component: Login },

  // // Admin routes
  // {
  //   path: 'admin/dashboard',
  //   component: Dashboard,
  //   canActivate: [authGuardGuard] // Uncomment when AuthGuard is implemented
  // },
  // { 
  //   path: 'admin/users', 
  //   component: UserManagement, 
  //   canActivate: [authGuardGuard] 
  // },
  
  // // Manager routes
  // {
  //   path: 'manager/dashboard',
  //   component: ManagerDashboard,
  //   canActivate: [authGuardGuard] // Uncomment when AuthGuard is implemented
  // },

  // //SalesrepManager ROutes
  // { 
  //   path: 'salesrepmanager/dashboard', 
  //   component: SalesrepmanagerDashboard, 
  //   canActivate: [authGuardGuard] 
  // },

  // //SalesrepManager ROutes
  // { 
  //   path: 'salesrep/dashboard', 
  //   component: SalesrepDashboard, 
  //   canActivate: [authGuardGuard] 
  // },


  {
    path: 'admin/dashboard',
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
    loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'admin/users',
    canActivate: [authGuard],
    data: {roles: ['Admin']},
    loadComponent: () => import('./pages/admin/user-management/user-management').then(m => m.UserManagement)
  },
  {
    path: 'manager/dashboard',
    canActivate: [authGuard],
    data: { roles: ['Manager'] },
    loadComponent: () => import('./pages/manager/manager-dashboard/manager-dashboard').then(m => m.ManagerDashboard)
  },
  {
    path: 'salesrepmanager/dashboard',
    canActivate: [authGuard],
    data: { roles: ['SalesRepManager'] },
    loadComponent: () => import('./pages/salesrepmanager/salesrepmanager-dashboard/salesrepmanager-dashboard').then(m => m.SalesrepmanagerDashboard)
  },
  {
    path: 'salesrep/dashboard',
    canActivate: [authGuard],
    data: { roles: ['SalesRep'] },
    loadComponent: () => import('./pages/salesrep/salesrep-dashboard/salesrep-dashboard').then(m => m.SalesrepDashboard)
  },


   { path: 'manager/dashboard', component: ManagerDashboard },
  { path: 'manager/team', component: SalesTeamComponent },
  { path: 'manager/targets', component: TargetsComponent },
  { path: 'manager/reports', component: Reports },

   { path: 'sr/dashboard', component: SalesrepDashboard },
  { path: 'sr/leads', component: Leads },
  { path: 'sr/opportunities', component: Opportunities },
];
