import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseConfig } from './shared/firebase.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor() {}

  // added a config file that is imported
  // this config file holds the api key for the server, which shouldn't be public
  ngOnInit() {
    firebase.initializeApp(FirebaseConfig.config);
  }
}
