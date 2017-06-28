import { Component, OnInit } from '@angular/core';
import { FirebaseConfig } from './shared/firebase.config';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // sets up firebase
    // moved firebase config to its own file that is not on git
    firebase.initializeApp(FirebaseConfig.config);
  }
}
