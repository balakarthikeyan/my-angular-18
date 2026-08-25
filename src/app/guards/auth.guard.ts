// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(private authService: AuthService, private router: Router) { }

	canActivate(): boolean {
		if (this.authService.isAuthenticated()) {
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}

	canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		// Check if the user is authenticated
		if (this.authService.isAuthenticated()) {
			return true;
		} else {
			// If the user is not authenticated, redirect to the login page
			this.router.navigate(['/login']);
			return false;
		}
	}
}