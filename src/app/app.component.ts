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
    firebase.initializeApp(FirebaseConfig.config);
  }
}
