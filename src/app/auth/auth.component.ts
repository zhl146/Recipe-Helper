import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor( private auth: AuthService,
               private router: Router ) {}

  ngOnInit() {
    if ( firebase.auth().currentUser ) {
      this.router.navigate(['recipes']);
    }
  }

}
