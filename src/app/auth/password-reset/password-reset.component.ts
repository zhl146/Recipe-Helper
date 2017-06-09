import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['../auth.component.scss']
})
export class PasswordResetComponent {

  constructor( private auth: AuthService,
               private router: Router ) { }

  // submits the form
  goToSignIn() {
    this.router.navigate(['auth', 'signin']);
  }
}
