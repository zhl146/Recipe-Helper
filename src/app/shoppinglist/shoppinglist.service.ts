import { Injectable } from '@angular/core';
import {Recipe} from '../recipebook/recipe.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShoppinglistService {

  ingredientsSubject = new Subject<string[]>();

  // dummy ingredient array
  // will remove it later and probably move this functionality to a service
  // service will most likely http call to a server for ingredient lists

  private ingredients: string[] = [
    'thing 1',
    'thing 2',
    'thing 3'
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  // adds an ingredient object to the ingredients array
  // results in a new ingredient being displayed to the user
  // method should be called when an event is fired from the shopping-edit component

  addIngredient(newIngredient: string) {
    this.ingredients.push(newIngredient);
    this.updateSubject();
  }

  // takes an index of the ingredients array and deletes it
  // results in that ingredient being removed from the user view
  // method should be called when an event is fired from the shopping-edit component
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.updateSubject();
  }

  // uses spread operator to concatenate two arrays
  // this one takes a recipe
  addIngredientsFromRecipe(recipe: Recipe) {
    this.ingredients.push(...recipe.ingredients);
    this.updateSubject();
  }

  // uses spread operator to concatenate two arrays
  // takes the ingredient array directly
  addIngredients(ingredients: string[]) {
    this.ingredients.push(...ingredients);
    this.updateSubject();
  }

  // updates a single ingredient in the array
  updateIngredient(ingredient: string, index: number) {
    this.ingredients[index] = ingredient;
    this.updateSubject();
  }

  // updates the entire ingredients array
  updateIngredients(ingredients: string[]) {
    this.ingredients = ingredients;
    this.updateSubject();
  }

  // broadcasts ingredients to all subscribers
  updateSubject() {
    this.ingredientsSubject.next(this.ingredients.slice());
  }

}
