import { Component, OnDestroy, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppinglistService} from '../../shoppinglist/shoppinglist.service';
import { RecipebookService } from '../recipebook.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  currentRecipe: Recipe;
  currentRecipeId: number;
  recipeSubscription: Subscription;

  // this is here so that we can display detailed recipe data when the user selects a specific recipe

  constructor( private shoppingService: ShoppinglistService,
               private recipeService: RecipebookService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    // this code would only work on the initial visit since this component will not
    // necessarily get destroyed before the route changes

    // this.currentRecipe = this.recipeService.getRecipeByIndex(+this.route.snapshot.params['id']);

    // gets the id from the parameters of the route
    // uses this id to grab the recipe from the recipe service

    this.route.params
      .subscribe( (params: Params ) => {
        // stores the id for later use
        // the + operator castes the id string to a number
        this.currentRecipeId = +params['id'];

        // uses the id to get the recipe from the service
        this.currentRecipe = this.recipeService.getRecipeByIndex(this.currentRecipeId);
      });

    this.recipeSubscription = this.recipeService.recipeSubject
      .subscribe(
        (recipes: Recipe[]) => {
          this.currentRecipe = recipes[this.currentRecipeId];
          console.log(this.currentRecipe);
        }
      );
  }

  onAddAllClicked() {
    this.shoppingService.addIngredientsFromRecipe(this.currentRecipe);
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

}
