import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppinglistService } from '../../shoppinglist/shoppinglist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  signedIn = false;
  signInListener: Subscription;

  constructor( private auth: AuthService,
               private shoppingService: ShoppinglistService) {}

  // get the status of sign in so the correct links can be displayed
  ngOnInit() {
    this.signInListener = this.auth.getSignedIn()
      .subscribe(
        (signedIn: boolean) => {
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
