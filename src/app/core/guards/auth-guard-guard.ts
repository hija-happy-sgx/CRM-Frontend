import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
   const router = inject(Router);

   const role = localStorage.getItem('role');

   if(role === 'Admin'){
    return true;
   }

   alert('Access denied. Admins only.');
   router.navigate(['/login/admin']);
  return false;
};
