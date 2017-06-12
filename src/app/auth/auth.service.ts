import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  // keeps track of sign in state
  private signedIn = new BehaviorSubject<boolean>(false);

  // this is the user authentication token
  private token: string;

  // currently keeps track of the server error message
  // we display it directly to the user for now
  errorMessage: string;

  constructor( private router: Router ) {}

  getSignedIn() {
    return this.signedIn.asObservable();
  }

  userSignedIn(): boolean {
    return this.signedIn.getValue();
  }

  // --------------------------------------------------------------------------
  // SIGN IN AND OUT
  // --------------------------------------------------------------------------

  // users firebase sdk to create a new user on the firebase server
  // then sets our sign in state to true
  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        () => {
          this.errorMessage = null;
          this.signInUser(email, password);
        }
      )
      .catch(
        (error) => {
          this.errorMessage = error.message;
        }
      );
  }

  // attempts to sign in an existing user using firebase sdk
  // then navigates to the homepage
  signInUser( email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        () => {
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token;
                if (this.token) {
                  this.errorMessage = null;
                  this.signedIn.next(true);
                  this.router.navigate(['/loading']);
                }
              }
            );
        })
      .catch(
        error => {
          this.errorMessage = error.message;
        }
      );
  }

  // sets signed in state to false
  // this will tell the loader component what to do when navigating there
  signOutUser() {
    console.log('sign out user called')
    this.signedIn.next(false);
    console.log('pushing next signin')
    this.router.navigate(['/loading']);
    console.log('finished logout')
  }

  // signs out of firebase, automatically deletes token in local storage
  firebaseSignOut() {
    firebase.auth().signOut();
  }
  // --------------------------------------------------------------------------
  // PASSWORD PROBLEMS
  // --------------------------------------------------------------------------

  sendPasswordEmail(email: string) {
    firebase.auth().sendPasswordResetEmail(email)
      .then(
        () => {
          this.router.navigate(['/auth', 'reset']);
        }
      );
  }

  // --------------------------------------------------------------------------
  // GUEST LOGIN
  // --------------------------------------------------------------------------

  signInAsGuest() {
    this.signInUser('guest@guest.com', '123456');
  }

  // --------------------------------------------------------------------------
  // TOKEN
  // --------------------------------------------------------------------------

  // if the user is logged in, this refreshes (I think?) the token
  // stores the token to be used by us in this service
  // then returns it
  getToken() {
    if ( this.signedIn.getValue() ) {
      firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => {
            this.token = token;
          },
          (error: Error) => {
            console.log(error);
          }
        );
      return this.token;
    }
  }

  checkToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
          this.signedIn.next(true);
          this.router.navigate(['/recipes']);
        }
      );
  }

  // --------------------------------------------------------------------------
  // USER INFORMATION
  // --------------------------------------------------------------------------

  getUserEmail() {
    return firebase.auth().currentUser.email;
  }

}
