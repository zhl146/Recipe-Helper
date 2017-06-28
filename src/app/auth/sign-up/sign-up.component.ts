import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth.component.scss'],
  animations: [
  ]
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;

  constructor( public auth: AuthService,
               private router: Router ) { }

  // initialize the form
  // both controls are required
  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.email]),

      // firebase requires the password to be at least 6 characters long
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  emailValid() {
    return ( this.signupForm.get('email').valid );
  }

  // we don't want to start by displaying an error message to the user
  // let the user actually do something first
  emailTouched() {
    return ( this.signupForm.get('email').touched &&
    this.signupForm.get('email').dirty );
  }

  passwordValid() {
    return ( this.signupForm.get('password').valid );
  }

  // we don't want to start by displaying an error message to the user
  // let the user actually do something first
  passwordTouched() {
    return (this.signupForm.get('password').touched &&
    this.signupForm.get('password').dirty );
  }

  // submits the form
  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    this.auth.signUpUser(email, password);
  }

  gotoSignIn() {
    this.auth.errorMessage = null;
    this.router.navigate(['auth', 'signin']);
  }

  onGuestSignIn() {
    this.auth.signInAsGuest();
  }

}
