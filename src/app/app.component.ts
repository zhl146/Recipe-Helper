import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  recipeActive: boolean = true;

  onLinkClicked(data: boolean) {
    this.recipeActive = data;
  }
}
