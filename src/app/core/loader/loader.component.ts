import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/auth.service';
import { ShoppinglistService } from '../../shared/shoppinglist.service';
import { RecipebookService } from '../../shared/recipebook.service';
import { OptionsService } from '../../shared/options.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  signInSubscription: Subscription;
  taskWatcher: Subscription;

  signInState: boolean;

  taskCounter = new BehaviorSubject(0);

  constructor ( private auth: AuthService,
                private shoppingService: ShoppinglistService,
                private recipesService: RecipebookService,
                private optionsService: OptionsService,
                private router: Router ) {}

  ngOnInit() {
    console.log('loading init')
    // listen for changes in the sign in state
    // if the user is signed in when hitting the loading page
    // this will pul data from the server
    // if the user is signed out then this will save all data to server
    this.signInSubscription = this.auth.getSignedIn()
      .subscribe(
        (signInState) => {
          this.signInState = signInState;
          console.log(signInState)
          if (this.signInState) {
            this.getServerData();
          } else {
            this.updateServerData();
          }
        }
      );

    // this checks if all async tasks were completed before continuing
    // we currently have 3 save/update tasks that need to be completed
    // in the case of signing in, we load all data before letting the user proceed
    // in the case of signing out, we need to save data using our token before
    // actually signing out of firebase
    this.taskWatcher = this.taskCounter.subscribe(
      (counter) => {
        if (counter === 3 && this.signInState) {
          this.router.navigate(['/recipes']);
        } else if (counter === 3 && !this.signInState ) {
          this.auth.firebaseSignOut();
          this.router.navigate(['/auth/signin']);
        }
      }
    );
  }

  // prevent memory leaks
  ngOnDestroy() {
    console.log('loading destroy')
    this.signInSubscription.unsubscribe();
    this.taskWatcher.unsubscribe();
  }

  incrementTaskCounter() {
    this.taskCounter.next(this.taskCounter.getValue() + 1);
  }

  updateServerData() {
    console.log('update server data called')
    this.shoppingService.updateDatabase()
      .then( () => this.incrementTaskCounter() );
    this.recipesService.updateServerRecipes()
      .then( () => this.incrementTaskCounter() );
    this.optionsService.updateServerOptions()
      .then( () => this.incrementTaskCounter() );
  }

  getServerData() {
    console.log('get server data called')
    this.shoppingService.getServerList()
      .then( () => this.incrementTaskCounter() );
    this.recipesService.getServerRecipes()
      .then( () => this.incrementTaskCounter() );
    this.optionsService.getServerOptions()
      .then( () => this.incrementTaskCounter() );
  }

}
