import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private auth: AuthService,
               private router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // reroutes back to login if the user is not signed in
    if (!this.auth.userSignedIn()) {
      this.router.navigate(['/auth/signup']);
    }
    return this.auth.userSignedIn();
  }

}
