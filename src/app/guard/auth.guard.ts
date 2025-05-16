import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authService.user$.pipe(
      take(1),
      map((user) => {
        if (state.url.includes('/login')) {
          // If user is logged in and trying to access login page, redirect to home
          if (user) {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        }

        // For protected routes, check if user is logged in
        if (user) {
          return true;
        } else {
          // Redirect to login page and store the attempted URL
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
      })
    );
  }
}
