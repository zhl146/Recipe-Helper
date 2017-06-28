import { Injectable } from '@angular/core';
import {Recipe} from '../recipebook/recipe.model';
import { AppHttpService } from './http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ShoppingListItem } from '../shoppinglist/shopping-list-item.model';

@Injectable()
export class ShoppinglistService {
  private shoppingList: BehaviorSubject<ShoppingListItem[]> = new BehaviorSubject(null);

  constructor( private http: AppHttpService ) {}

  getLocalList() {
    return this.shoppingList.getValue();
  }

  // takes an index of the ingredients array and deletes it
  // results in that ingredient being removed from the user view
  // method should be called when an event is fired from the shopping-edit component
  deleteListItem(index: number): void {
    const updatedList = this.shoppingList.getValue();
    updatedList.splice(index, 1);
    this.shoppingList.next(updatedList);
    this.updateServerList();
  }

  addIngredient(newIngredient: ShoppingListItem): void {
    const updatedList = this.shoppingList.getValue();
    updatedList.push(newIngredient);
    this.shoppingList.next(updatedList);
  }

  // uses spread operator to concatenate two arrays
  // this one takes a currentRecipe
  addIngredientsFromRecipe(recipe: Recipe): void {
    const updatedList = this.shoppingList.getValue();
    for (const ingredient of recipe.ingredients) {
      const newListItem = new ShoppingListItem(false, ingredient);
      updatedList.push(newListItem);
    }
    this.shoppingList.next(updatedList);
  }

  // updates a single ingredient in the array
  updateListItem(item: ShoppingListItem, index: number): void {
    const updatedList = this.shoppingList.getValue();
    updatedList[index] = item;
    this.shoppingList.next(updatedList);
  }

  // updates the entire ingredients array
  updateLocalList(items: ShoppingListItem[]): void {
    this.shoppingList.next(items);
  }

  // gets list from server
  // returns a promise that resolves the list object array
  getServerList(): Promise<ShoppingListItem[]> {
    return new Promise(
      (resolve) => {
        this.http.getData('list')
          .subscribe(
            (data) => {
              if (data) {
                this.shoppingList.next(data);
              } else {
                this.shoppingList.next([]);
              }
              resolve(data);
            }
          );
      }
    );
  }

  // throws data to backend through http call
  // returns a promise so that we can chain off of this
  updateServerList(): Promise<boolean> {
    return new Promise(
      (resolve) => {
        let currentList = this.shoppingList.getValue();
        if (!currentList) {
          currentList = [];
        }
        this.http.saveList(currentList).subscribe(
          () => resolve(true),
          () => resolve(false)
        );
      }
    );
  }

}
