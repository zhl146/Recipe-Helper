import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  // an emitter that emits a boolean

  @Output() linkClicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  // this emitted boolean has to do with view control
  // currently the view is controlled by ngIf in the app component
  // true means that the user is currently looking at the recipe book
  // false means that the user must be looking at the shopping list
  // these two views are the only current views and they are mutually exclusive
  // will most likely switch this functionality to router later

  onRecipeBookClick() {
    this.linkClicked.emit(true);
  }

  onShoppingListClick() {
    this.linkClicked.emit(false);
  }

}
