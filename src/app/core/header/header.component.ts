import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog } from '@angular/material';

import { AppNav } from '../../navigation.model';

import { AuthService } from '../../auth/auth.service';
import { ShoppinglistService } from '../../shared/shoppinglist.service';

import { OptionsDialogComponent } from '../options-dialog/options-dialog.component';
import { OptionsService } from '../../shared/options.service';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  signedIn = false;
  signInListener: Subscription;

  navigation: AppNav[];

  mediaSize: string;
  mediaSub: Subscription;

  constructor( private auth: AuthService,
               private dialog: MdDialog,
               private media: ObservableMedia ) {}

  // get the status of sign in so the correct links can be displayed
  ngOnInit() {
    this.signInListener = this.auth.getSignedIn()
      .subscribe(
        (signedIn: boolean) => {
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
    this.getScreenSize();
  }

  getScreenSize() {
    this.mediaSub = this.media
      .subscribe(
        (media) => {
          this.mediaSize = media.mqAlias;
        }
      );
  }

  // only show the sliding nav on xs devices after sign in
  showMobileNav() {
    return (this. mediaSize === 'xs' && this.signedIn);
  }

  // make sure that we save the shopping list if the user happens to logout from the shopping component
  // this caused a app breaking bug since the user is signed out before the shopping component has
  // the opportunity to save itself to the server
  onLogOut() {
    const optionsDialog = this.dialog.open(OptionsDialogComponent);
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
    this.signInListener.unsubscribe();
    this.mediaSub.unsubscribe();
  }
}
