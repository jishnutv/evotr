import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  authService = inject(AuthService);
  route = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authService.isAuthenticated()) {
      return true;
    }else {
      this.route.navigate(['login']);
      return false;
    }
  }
}


export const authGuard: CanActivateFn = (route, state): boolean => {
  return inject(AuthGuard).canActivate(route, state);
};
