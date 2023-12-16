import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard {
  authService = inject(AuthService);
  route = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authService.isAuthenticated()) {
      this.route.navigate(['home']);
      return false;
    }else {
      return true;
    }
  }
}


export const noAuthGuard: CanActivateFn = (route, state): boolean => {
  return inject(NoAuthGuard).canActivate(route, state);
};