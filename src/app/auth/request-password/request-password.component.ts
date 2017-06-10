import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RequestPasswordComponent implements OnInit {

  requestForm: FormGroup;

  constructor( public auth: AuthService ) { }

  // initialize the form
  // both controls are required
  ngOnInit() {
    this.requestForm = new FormGroup({
      email: new FormControl('', [Validators.email])
    });
  }

  emailValid() {
    return ( this.requestForm.get('email').valid );
  }

  // we don't want to start by displaying an error message to the user
  // let the user actually do something first
  emailTouched() {
    return ( this.requestForm.get('email').touched &&
    this.requestForm.get('email').dirty );
  }

  // submits the form
  onSubmit() {
    const email = this.requestForm.get('email').value;
    this.auth.sendPasswordEmail(email);
  }
}
