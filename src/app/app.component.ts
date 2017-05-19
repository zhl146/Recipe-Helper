import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // currently controls which view is active: recipe book or shopping list
  // there is only one boolean because they are mutually exclusive
  // will most likely change this to routing instead of ngIf later
  recipeActive: boolean = true;

  // reacts to a click event in the header component
  // records the boolean passed by the event in order to change the view via ngIf
  onLinkClicked(data: boolean) {
    this.recipeActive = data;
  }
}
