import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor() {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyA7xdWQ0omOcozfvYHproNrWcp_k5XqzyQ',
      authDomain: 'recipebook-1b98a.firebaseapp.com'
    });
  }
}
