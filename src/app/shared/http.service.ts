import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx';
import * as firebase from 'firebase';

import { Recipe } from '../recipebook/recipe.model';
import { ShoppingListItem } from '../shoppinglist/shopping-list-item.model';
import { UserService } from './user.service';


@Injectable()
export class AppHttpService {

  databaseUrl = 'https://recipebook-1b98a.firebaseio.com/';

  constructor( private http: Http,
               private userService: UserService ) {}

  // not the most secure way to do it, but this allows each user to have their own
  // database files
  getUrl(route): string {
    const userEmail = firebase.auth().currentUser.email.replace(/[^a-zA-Z0-9]/g, '_');
    const token = this.userService.getCurrentToken();
    return this.databaseUrl
      + userEmail
      + route
      + '.json?auth='
      + token;
  }

  genericPut(route: string, data: any) {
    const url = this.getUrl(route);
    return this.http.put(url, data);
  }

  genericPost(route: string, data: any) {
    const url = this.getUrl(route);
    return this.http.post(url, data);
  }

  genericGet(route: string) {
    const url = this.getUrl(route);
    return this.http.get(url);
  }

  getData(dataType: string) {
    return this.genericGet(dataType)
            .map(
              (data) => {
                return data.json();
              }
            );
  }

  saveRecipes(data: Recipe[]) {
    return this.genericPut('recipes', data);
  }

  saveList(data: ShoppingListItem[]) {
    return this.genericPut('list', data);
  }

  saveOptions(data: any) {
    return this.genericPut('options', data);
  }

}
