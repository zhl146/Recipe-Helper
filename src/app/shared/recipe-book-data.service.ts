import { Injectable } from '@angular/core';
import { AppHttpService } from './http.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Recipe } from '../recipebook/recipe.model';
import { stockRecipes } from '../recipebook/stock-recipes.const';

// this is the recipe data service
// it holds the recipes array and shares it among all subscribers
@Injectable()
export class RecipeBookDataService {
  private stockRecipes = stockRecipes;

  private recipeList = new BehaviorSubject<Recipe[]>([]);

  constructor( private http: AppHttpService ) {}

  getLocalRecipes() {
    return this.recipeList.asObservable();
  }

  // returns a specific recipe
  getLocalRecipebyIndex(recIndex: number): Recipe {
    return this.recipeList.getValue()[recIndex];
  }

  // adds a recipe to the end of the array and updates all subscribers
  addRecipe(recipe: Recipe) {
    let updatedRecipes = this.recipeList.getValue();
    if (!updatedRecipes) {
      updatedRecipes = [];
    }
    updatedRecipes.push(recipe);
    this.recipeList.next(updatedRecipes);
    this.updateServerRecipes();
  }

  // deletes a recipe out of the array by index and updates all subscribers
  deleteRecipe(index: number) {
    const updatedRecipes = this.recipeList.getValue();
    updatedRecipes.splice(index, 1);
    this.recipeList.next(updatedRecipes);
    this.updateServerRecipes();
  }

  // updates a specific recipe in the array by index and updates all subscribers
  editRecipe(changedRecipe: Recipe, recipeIndex: number) {
    const updatedRecipes = this.recipeList.getValue();
    updatedRecipes[recipeIndex] = changedRecipe;
    this.recipeList.next(updatedRecipes);
    this.updateServerRecipes();
  }

  // toggles the boolean that controls favorite hearts
  toggleRecipeFav(recipeIndex: number) {
    const updatedRecipes = this.recipeList.getValue();
    updatedRecipes[recipeIndex].favorite = !updatedRecipes[recipeIndex].favorite;
    this.recipeList.next(updatedRecipes);
    this.updateServerRecipes();
  }

  getServerRecipes() {
    return new Promise(
      (resolve) => {
        this.http.getData('recipes')
          .subscribe(
            (recipes) => {
              if (recipes) {
                this.recipeList.next(recipes);
              } else {
                this.recipeList.next(this.stockRecipes);
              }
              resolve(recipes);
            }
          );
      }
    );
  }

  updateServerRecipes() {
    return new Promise(
      (resolve) => {
        // alphabetizes the recipe list before it gets sent to server
        const recipes = this.recipeList.getValue();
        recipes.sort(
          (a, b) => {
            if (a > b) {
              return +1;
            } else if (a < b) {
              return -1;
            } else {
              return 0;
            }
          }
        );
        this.http.saveRecipes(this.recipeList.getValue())
          .subscribe(
            () => resolve()
        );
      }
    );
  }
}
