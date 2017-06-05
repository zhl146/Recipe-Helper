import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  signupForm: FormGroup;

  // use this string to keep track of whether the user is
  // signing in or signing up
  // I thought it was redundant to also keep a boolean
  // but it might be clearer if I did so
  submitText = 'up';

  constructor( private auth: AuthService ) { }

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
    if (this.submitText === 'up') {
      this.auth.signUpUser(email, password);
    } else {
      this.auth.signInUser(email, password);
    }
  }

  toggleSubmit() {
     if (this.submitText === 'up') {
       this.submitText = 'in';
     } else {
       this.submitText = 'up';
     }
  }

}
