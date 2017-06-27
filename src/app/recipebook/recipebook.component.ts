import { Component, OnDestroy, OnInit } from '@angular/core';

import { ShoppinglistService } from '../shared/shoppinglist.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipebook.component.html',
  styleUrls: ['./recipebook.component.scss']
})

export class RecipeBookComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject<any>();

  constructor( private shoppingService: ShoppinglistService ) {}

  ngOnInit() {
    // have to get the shopping list from the server even when we
    // display the recipes because the user may add things to the shopping list
    // from this feature module
    // we want our local data to be up to date so we do not overwrite server data
    // that we are not aware of
    // the if statement is there to avoid component data collisions
    if ( !this.shoppingService.getLocalList() ) {
      this.shoppingService.getServerList();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
