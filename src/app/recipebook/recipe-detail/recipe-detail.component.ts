import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe} from '../recipe.model';
import { ShoppinglistService} from '../../shoppinglist/shoppinglist.service';
import { RecipebookService } from '../recipebook.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  deletionState: string;
  markedForDeletion: boolean;
  currentRecipe: Recipe;
  currentRecipeId: number;
  recipeSubscription: Subscription;

  // this is here so that we can display detailed currentRecipe data when the user selects a specific currentRecipe

  constructor( private shoppingService: ShoppinglistService,
               private recipeService: RecipebookService,
               private route: ActivatedRoute,
               private router: Router,
               public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.deletionState = 'normal';
    this.markedForDeletion = false;

    // gets the id from the parameters of the route
    // uses this id to grab the currentRecipe from the currentRecipe service
    this.route.params
      .subscribe( (params: Params ) => {
        // stores the id for later use
        // the + operator castes the id string to a number
        this.currentRecipeId = +params['id'];

        // uses the id to get the currentRecipe from the service
        this.currentRecipe = this.recipeService.getRecipeByIndex(this.currentRecipeId);
      });

    this.recipeSubscription = this.recipeService.getRecipes()
      .subscribe(
        (recipes: Recipe[]) => {
          console.log(this.currentRecipeId)
          this.currentRecipe = recipes[this.currentRecipeId];
          console.log(recipes);
          console.log(this.currentRecipe);
        }
      );
  }

  // take care of memory leak
  // update the server so when the user goes to shopping component, it can be updated from server
  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
    this.shoppingService.updateDatabase();
  }

  onAddAllClicked() {
    this.shoppingService.addIngredientsFromRecipe(this.currentRecipe);
  }

  onAddIngredient(newIngredient: string) {
    this.openSnackBar('Ingredient added to list!');
    this.shoppingService.addIngredient(newIngredient);
  }

  onDeleteIntent() {
    this.markedForDeletion = true;
    this.deletionState = 'marked';
  }

  onDeleteCancel() {
    this.markedForDeletion = false;
    this.deletionState = 'normal';
  }

  onDeleteConfirm() {
    this.recipeService.deleteRecipe(this.currentRecipeId);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000
    });
  }
}
