import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs/Subject';

// this is the recipe data service
// it holds the recipes array and shares it among all subscribers
@Injectable()
export class RecipebookService {
  recipeSubject = new Subject<Recipe[]>();

  // dummy currentRecipe list
  // will most likely be pulled from a data service that makes http calls to a server

  private _recipes: Recipe[] = [
    new Recipe(
      'Recipe 1',
      'Im sure this is something good',
      'http://maxpixel.freegreatpicture.com/static/photo/1x/Cocktail-Party-Recipe-Alcohol-Drink-Pisco-Sour-833896.jpg',
      [
        'Thing 1',
        'Thing 2',
        'Thing 3'
      ],
      [
        'Do thing 1',
        'Do thing 2',
        '?????',
        'Profit'
      ],
      15,
      15
    ),
    new Recipe(
      'Recipe 2',
      'Im sure this is something good too',
      'http://maxpixel.freegreatpicture.com/static/photo/1x/Cocktail-Party-Recipe-Alcohol-Drink-Pisco-Sour-833896.jpg',
      [
        'Thing 1',
        'Thing 2',
        'Thing 3'
      ],
      [
        'Do thing 1',
        'Do thing 2',
        '?????',
        'Profit'
      ],
      150,
      30
    )
  ];

  // returns a copy of the recipe array
  getRecipes() {
    return this._recipes.slice();
  }

  // returns a specific recipe
  getRecipeByIndex(recIndex: number): Recipe {
    return this._recipes[recIndex];
  }

  // adds a recipe to the end of the array and updates all subscribers
  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
    this.broadcastRecipes();
  }

  // deletes a recipe out of the array by index and updates all subscribers
  deleteRecipe(index: number) {
    this._recipes.splice(index, 1);
    this.broadcastRecipes();
  }

  // updates a specific recipe in the array by index and updates all subscribers
  editRecipe(changedRecipe: Recipe, recipeIndex: number) {
    this._recipes[recipeIndex] = changedRecipe;
    this.broadcastRecipes();
  }

  // updates all subscribers
  broadcastRecipes() {
    this.recipeSubject.next(this._recipes.slice());
  }

}
