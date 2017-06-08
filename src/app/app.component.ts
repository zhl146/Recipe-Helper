import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseConfig } from './shared/firebase.config';
import { AuthService } from './auth/auth.service';
import { ShoppinglistService } from './shoppinglist/shoppinglist.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  signedIn = false;
  signInListener: Subscription;

  navigation;

  constructor( private auth: AuthService,
               private shoppingService: ShoppinglistService) {}

  // get the status of sign in so the correct links can be displayed
  ngOnInit() {
    firebase.initializeApp(FirebaseConfig.config);
    this.navigation = [ ,
      {
        route: '/login',
        text: 'Sign in'
      }
    ];

    this.signInListener = this.auth.getSignedIn()
      .subscribe(
        (signedIn: boolean) => {
          if (signedIn) {
            this.navigation = [
              {
                route: '/recipes',
                text: 'Recipe Book'
              },
              {
                route: '/shopping',
                text: 'Shopping List'
              }
            ];
          } else {
            this.navigation = [
              {
                route: '/auth',
                text: 'Sign in'
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
    this.shoppingService.updateDatabase();
    this.auth.signOutUser();
  }

  // prevent memory leak
  ngOnDestroy() {
    this.signInListener.unsubscribe();
  }

}
