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

  ngOnInit() {
    firebase.initializeApp(FirebaseConfig.config);
  }
}
