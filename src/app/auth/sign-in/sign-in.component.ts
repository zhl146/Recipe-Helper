import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../auth.component.scss']
})
export class SignInComponent implements OnInit {

  signinForm: FormGroup;

  constructor( public auth: AuthService,
               private router: Router ) { }

  // initialize the form
  // both controls are required
  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.email]),

      // firebase requires the password to be at least 6 characters long
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  emailValid() {
    return ( this.signinForm.get('email').valid );
  }

  // we don't want to start by displaying an error message to the user
  // let the user actually do something first
  emailTouched() {
    return ( this.signinForm.get('email').touched &&
    this.signinForm.get('email').dirty );
  }

  passwordValid() {
    return ( this.signinForm.get('password').valid );
  }

  // we don't want to start by displaying an error message to the user
  // let the user actually do something first
  passwordTouched() {
    return (this.signinForm.get('password').touched &&
    this.signinForm.get('password').dirty );
  }

  // submits the form
  onSubmit() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    this.auth.signInUser(email, password);
  }

  gotoSignUp() {
    this.auth.errorMessage = null;
    this.router.navigate(['auth', 'signup']);
  }

  goToPasswordReset() {
    this.auth.errorMessage = null;
    this.router.navigate(['auth', 'request']);
  }
}
