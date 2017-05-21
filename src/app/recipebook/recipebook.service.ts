import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipebookService {

  recipeSubject = new Subject<Recipe[]>();

  // dummy recipe list
  // will most likely be pulled from a data service that makes http calls to a server

  private recipes: Recipe[] = [
    new Recipe(
      'Recipe 1',
      'Im sure this is something good',
      'http://maxpixel.freegreatpicture.com/static/photo/1x/Cocktail-Party-Recipe-Alcohol-Drink-Pisco-Sour-833896.jpg',
      [
        new Ingredient('apple', 3, ''),
        new Ingredient('butter', 3, 'tablespoons')
      ]
    ),
    new Recipe(
      'Recipe 2',
      'Im sure this is something good too',
      'http://maxpixel.freegreatpicture.com/static/photo/1x/Cocktail-Party-Recipe-Alcohol-Drink-Pisco-Sour-833896.jpg',
      [
        new Ingredient('pear', 3, ''),
        new Ingredient('butter', 3, 'tablespoons')
      ]
    )
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeByIndex(recIndex: number): Recipe {
    return this.recipes[recIndex];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.broadcastRecipes();
  }

  editRecipe(changedRecipe: Recipe, recipeIndex: number) {
    this.recipes[recipeIndex] = changedRecipe;
    this.broadcastRecipes();
  }

  broadcastRecipes() {
    this.recipeSubject.next(this.recipes.slice());
  }

}
