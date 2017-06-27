import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { AppNav } from '../../navigation.model';

import { AuthService } from '../../auth/auth.service';

import { SignOutDialogComponent } from '../sign-out-dialog/sign-out-dialog.component';
import { UserService } from '../../shared/user.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  signedIn = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  navigation: AppNav[];

  constructor( private auth: AuthService,
               private dialog: MdDialog,
               private userService: UserService ) {}

  // get the status of sign in so the correct links can be displayed
  ngOnInit() {
    this.userService.localUserObs()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (signedIn) => {
          if (signedIn) {
            this.navigation = [
              {
                route: '/recipes',
                displayText: 'Recipe Book'
              },
              {
                route: '/shopping',
                displayText: 'Shopping List'
              }
            ];
          } else {
            this.navigation = [
              {
                route: '/auth/signup',
                displayText: 'Sign up'
              },
              {
                route: '/auth/signin',
                displayText: 'Sign in'
              }
            ];
          }
          this.signedIn = signedIn;
        }
      );
  }

  // make sure that we save the shopping list if the user happens to logout from the shopping component
  // this caused a app breaking bug since the user is signed out before the shopping component has
  // the opportunity to save itself to the server
  onLogOut() {
    const optionsDialog = this.dialog.open(SignOutDialogComponent);
    optionsDialog.afterClosed()
      .subscribe(
        (result) => {
          if (result === 'yes') {
            this.auth.signOutUser();
          }
        }
      );
  }

  // prevent memory leak
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
