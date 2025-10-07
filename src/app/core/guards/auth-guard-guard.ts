import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storedRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  //  No token or role → not logged in
  if (!token || !storedRole) {
    alert('Please log in first.');
    router.navigate(['/login']);
    return false;
  }

  // Roles allowed for this route (set in route data)
  const allowedRoles = route.data['roles'] as string[];

  //  If no role restriction, allow
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  //  If user role is allowed → OK
  if (allowedRoles.includes(storedRole)) {
    return true;
  }

  //  Otherwise → deny access
  alert(`Access denied. This area is restricted to ${allowedRoles.join(', ')}.`);
  router.navigate(['/login']);
  return false;
};
