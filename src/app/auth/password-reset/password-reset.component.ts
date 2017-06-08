import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['../auth.component.scss']
})
export class PasswordResetComponent implements OnInit {

  resetForm: FormGroup;

  constructor( private auth: AuthService,
               private router: Router ) { }

  // initialize the form
  // both controls are required
  ngOnInit() {
    this.resetForm = new FormGroup({
      code: new FormControl(''),

      // firebase requires the password to be at least 6 characters long
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  passwordValid() {
    return ( this.resetForm.get('password').valid );
  }

  // we don't want to start by displaying an error message to the user
  // let the user actually do something first
  passwordTouched() {
    return (this.resetForm.get('password').touched &&
    this.resetForm.get('password').dirty );
  }

  // submits the form
  onSubmit() {
    const code = this.resetForm.get('code').value;
    const password = this.resetForm.get('password').value;
    this.auth.createNewPassword(code, password);
  }
}
