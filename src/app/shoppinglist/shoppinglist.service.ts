import { Injectable } from '@angular/core';
import {Recipe} from '../recipebook/recipe.model';
import { AppHttpService } from '../shared/http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ShoppinglistService {
  private shoppingListSubject: BehaviorSubject<string[]>;

  constructor( private http: AppHttpService ) {
    this.shoppingListSubject = new BehaviorSubject([]);
    this.http.getList()
      .subscribe(
        (data) => {
          this.shoppingListSubject.next(data);
        }
      );
  }

  // adds an ingredient object to the ingredients array
  // results in a new ingredient being displayed to the user
  // method should be called when an event is fired from the shopping-edit component

  getShoppingSubject() {
    return this.shoppingListSubject;
  }

  addIngredient(newIngredient: string) {
    const updatedList = this.shoppingListSubject.getValue();
    updatedList.push(newIngredient);
    this.shoppingListSubject.next(updatedList);
  }

  // takes an index of the ingredients array and deletes it
  // results in that ingredient being removed from the user view
  // method should be called when an event is fired from the shopping-edit component
  deleteIngredient(index: number) {
    this.shoppingListSubject.next(this.shoppingListSubject.getValue().splice(index, 1));
  }

  // uses spread operator to concatenate two arrays
  // this one takes a currentRecipe
  addIngredientsFromRecipe(recipe: Recipe) {
    const updatedList = this.shoppingListSubject.getValue();
    updatedList.push(...recipe.ingredients);
    this.shoppingListSubject.next(updatedList);
  }

  // uses spread operator to concatenate two arrays
  // takes the ingredient array directly
  addIngredients(ingredients: string[]) {
    const updatedList = this.shoppingListSubject.getValue();
    updatedList.push(...ingredients);
    this.shoppingListSubject.next(updatedList);
  }

  // updates a single ingredient in the array
  updateIngredient(ingredient: string, index: number) {
    const updatedList = this.shoppingListSubject.getValue();
    updatedList[index] = ingredient;
    this.shoppingListSubject.next(updatedList);
  }

  // updates the entire ingredients array
  updateIngredients(ingredients: string[]) {
    this.shoppingListSubject.next(ingredients);
  }

  // throws data to backend through http call
  updateDatabase() {
    const currentList = this.shoppingListSubject.getValue();
    this.http.saveList(currentList)
      .subscribe(
        (data) => {
          console.log(data);
        }
      );
  }

}
