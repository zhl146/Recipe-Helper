import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase';

import { ShoppinglistService } from '../shared/shoppinglist.service';
import { RecipeBookDataService } from '../shared/recipe-book-data.service';
import { OptionsService } from '../shared/options.service';
import { UserService } from '../shared/user.service';
import { User } from 'firebase/app';


@Injectable()
export class AuthService {


  // keeps track of sign in state

  // currently keeps track of the server error message
  // we display it directly to the user for now
  errorMessage: string;

  constructor( private router: Router,
               private shoppingService: ShoppinglistService,
               private recipesService: RecipeBookDataService,
               private optionsService: OptionsService,
               private userService: UserService
  ) {}

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(
            (currentUser: User) => {
              currentUser.getIdToken()
                .then(
                  (token: string) => {
                    this.userService.updateLocalToken(token);
                    this.getServerData()
                      .then(
                        () => {
                          this.userService.updateLocalUser(currentUser);
                          this.router.navigate(['recipes'])
                            .then(
                              () => resolve(currentUser)
                            );
                        }
                      );
                  }
                );
            }
          );
      }
    );
  }

  signUpUser(email: string, password: string) {
    return new Promise(
      (resolve) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(
            () => {
              this.signInUser(email, password)
                .then(
                  () => resolve()
                );
            }
          );
      }
    );
  }

  signInAsGuest() {
    this.signInUser('guest@guest.com', '123456');
  }

  sendPasswordEmail(email: string) {
    firebase.auth().sendPasswordResetEmail(email);
  }

  signOutUser() {
    return new Promise(
      (resolve) => {
        this.updateServerData()
          .then(() => {
              firebase.auth().signOut()
                .then(
                  () => {
                    this.userService.removeLocalUser();
                    this.userService.removeLocalToken();
                    this.router.navigate(['auth', 'signin']);
                    resolve(true);
                  }
                );
            }
          );
      }
    );
  }

  updateServerData() {
    return new Promise(
      (resolve) => {
        const taskCounter = new BehaviorSubject(0);
        taskCounter.subscribe(
          (counter) => {
            if (counter === 3) {
              resolve(true);
            }
          }
        );
        this.shoppingService.updateServerList()
          .then( () => taskCounter.next(taskCounter.getValue() + 1) );
        this.recipesService.updateServerRecipes()
          .then( () => taskCounter.next(taskCounter.getValue() + 1) );
        this.optionsService.updateServerOptions()
          .then( () => taskCounter.next(taskCounter.getValue() + 1) );
      }
    );
  }

  getServerData() {
    return new Promise(
      (resolve) => {
        const taskCounter = new BehaviorSubject(0);
        taskCounter.subscribe(
          (counter) => {
            if (counter === 3) {
              resolve(true);
            }
          }
        );
        this.shoppingService.getServerList()
          .then( () => taskCounter.next(taskCounter.getValue() + 1) );
        this.recipesService.getServerRecipes()
          .then( () => taskCounter.next(taskCounter.getValue() + 1) );
        this.optionsService.getServerOptions()
          .then( () => taskCounter.next(taskCounter.getValue() + 1) );
      }
    );
  }

}
