import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { ShoppinglistService } from '../shared/shoppinglist.service';
import { RecipeBookDataService } from '../shared/recipe-book-data.service';
import { UserService } from '../shared/user.service';
import { User } from 'firebase/app';


@Injectable()
export class AuthService implements OnInit {


  // keeps track of sign in state

  // currently keeps track of the server error message
  // we display it directly to the user for now
  errorMessage: string;

  constructor( private router: Router,
               private shoppingService: ShoppinglistService,
               private recipesService: RecipeBookDataService,
               private userService: UserService
  ) {}

  ngOnInit() {}

  signInUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (currentUser: User) => {
          this.userService.updateLocalUser(currentUser);
          return currentUser.getIdToken();
        }
      )
      .then(
        (token: string) => {
          this.userService.updateLocalToken(token);
          return this.getServerData();
        }
      )
      .then(
        () => {
          return this.router.navigate([ 'recipes' ]);
        }
      );
  }

  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        () => {
          return this.signInUser(email, password);
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
    this.updateServerData()
      .then( () => {
        return firebase.auth().signOut();
      })
      .then( () => {
        this.userService.removeLocalUser();
        this.userService.removeLocalToken();
        return this.router.navigate(['auth', 'signin']);
      });
  }

  updateServerData() {
    return Promise.all([
      this.shoppingService.updateServerList(),
      this.recipesService.updateServerRecipes()
    ]);
  }

  getServerData() {
    return Promise.all([
      this.shoppingService.getServerList(),
      this.recipesService.getServerRecipes()
    ]);
  }
}
