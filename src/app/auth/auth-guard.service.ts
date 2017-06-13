import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import * as firebase from 'firebase';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // reroutes back to login if the user is not signed in
    if (!firebase.auth().currentUser) {
      this.router.navigate(['/auth/signup']);
      return false;
    }
    return true;
  }

}
