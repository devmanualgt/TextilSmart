import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../modules/auth/services/auth.service';
import { inject, Injectable } from '@angular/core';
/*
export const AuthGuard: CanActivateFn = (route, state) => {
  //return true;
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }
  router.navigate(['/auth/login']);
  return true;
};
 */

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
