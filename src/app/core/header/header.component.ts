import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog } from '@angular/material';

import { AppNav } from '../../navigation.model';

import { AuthService } from '../../auth/auth.service';
import { ShoppinglistService } from '../../shoppinglist/shoppinglist.service';

import { SignoutDialogComponent } from '../signout-dialog/signout-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  signedIn = false;
  signInListener: Subscription;

  navigation: AppNav[];

  constructor( private auth: AuthService,
               private shoppingService: ShoppinglistService,
               private dialog: MdDialog ) {}

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
            this.navigation = [];
          }
          this.signedIn = signedIn;
        }
      );
  }

  // make sure that we save the shopping list if the user happens to logout from the shopping component
  // this caused a app breaking bug since the user is signed out before the shopping component has
  // the opportunity to save itself to the server
  onLogOut() {
    this.shoppingService.updateDatabase();
    const deleteDialog = this.dialog.open(SignoutDialogComponent);
    deleteDialog.afterClosed()
      .subscribe(
        (result) => {
          console.log(result);
          if (result === 'yes') {
            console.log('derp')
            this.auth.signOutUser();
          }
        }
      );
  }

  // prevent memory leak
  ngOnDestroy() {
    this.signInListener.unsubscribe();
  }
}
