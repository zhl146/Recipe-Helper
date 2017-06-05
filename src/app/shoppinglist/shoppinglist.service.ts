import { Injectable } from '@angular/core';
import {Recipe} from '../recipebook/recipe.model';
import { AppHttpService } from '../shared/http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ShoppinglistService {
  private shoppingList: BehaviorSubject<string[]> = new BehaviorSubject(null);

  constructor( private http: AppHttpService ) {
  }

  getServerList() {
    this.http.getList()
      .subscribe(
        (data) => {
          if (data) {
            console.log('got data from server: ' + data);
            this.shoppingList.next(data);
          } else {
            console.log('no data exists on server');
            this.shoppingList.next([]);
          }
        }
      );
  }

  getShoppingSubject() {
    return this.shoppingList;
  }

  addIngredient(newIngredient: string) {
    const updatedList = this.shoppingList.getValue();
    updatedList.push(newIngredient);
    this.shoppingList.next(updatedList);
  }

  // takes an index of the ingredients array and deletes it
  // results in that ingredient being removed from the user view
  // method should be called when an event is fired from the shopping-edit component
  deleteIngredient(index: number) {
    const updatedList = this.shoppingList.getValue();
    updatedList.splice(index, 1);
    this.shoppingList.next(updatedList);
    this.updateDatabase();
  }

  // uses spread operator to concatenate two arrays
  // this one takes a currentRecipe
  addIngredientsFromRecipe(recipe: Recipe) {
    const updatedList = this.shoppingList.getValue();
    updatedList.push(...recipe.ingredients);
    this.shoppingList.next(updatedList);
  }

  // uses spread operator to concatenate two arrays
  // takes the ingredient array directly
  addIngredients(ingredients: string[]) {
    const updatedList = this.shoppingList.getValue();
    updatedList.push(...ingredients);
    this.shoppingList.next(updatedList);
  }

  // updates a single ingredient in the array
  updateIngredient(ingredient: string, index: number) {
    const updatedList = this.shoppingList.getValue();
    updatedList[index] = ingredient;
    this.shoppingList.next(updatedList);
  }

  // updates the entire ingredients array
  updateIngredients(ingredients: string[]) {
    this.shoppingList.next(ingredients);
  }

  // throws data to backend through http call
  updateDatabase() {
    const currentList = this.shoppingList.getValue();
    console.log(currentList);

    this.http.saveList(currentList)
      .subscribe(
        (data) => {
          console.log(data);
        }
      );
  }

  newUserListInit() {
    this.http.saveList([])
      .subscribe(
        response => console.log(response)
      );
  }

}
