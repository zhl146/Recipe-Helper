import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { Recipe} from '../recipe.model';
import { ShoppinglistService} from '../../shared/shoppinglist.service';
import { RecipebookService } from '../../shared/recipebook.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject<any>();

  currentRecipe: Recipe;
  currentRecipeId: number;

  // this is here so that we can display detailed currentRecipe data when the user selects a specific currentRecipe

  constructor( private shoppingService: ShoppinglistService,
               private recipeService: RecipebookService,
               private route: ActivatedRoute,
               public snackBar: MdSnackBar) { }

  ngOnInit() {

    // gets the id from the parameters of the route
    // uses this id to grab the currentRecipe from the currentRecipe service
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe( (params: Params ) => {
        // stores the id for later use
        // the + operator castes the id string to a number
        this.currentRecipeId = +params['id'];

        // uses the id to get the currentRecipe from the service
        this.currentRecipe = this.recipeService.getLocalRecipebyIndex(this.currentRecipeId);

      });

    this.recipeService.getLocalRecipes()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (recipes: Recipe[]) => {
          this.currentRecipe = recipes[this.currentRecipeId];
        }
      );
  }

  // take care of memory leak
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // adds all ingredients from the recipe to the list
  onAddAllIngredients() {
    this.openSnackBar('All ingredients added!', 'OK');
    this.shoppingService.addIngredientsFromRecipe(this.currentRecipe);
  }

  // adds a single ingredient to the shopping list
  onAddIngredient(newIngredient: string) {
    this.openSnackBar('Ingredient added to list!', 'OK');
    this.shoppingService.addIngredient(newIngredient);
  }

  // snackbar notification that user added something to shopping list
  // thought there should be some kind of user feedback for this
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
