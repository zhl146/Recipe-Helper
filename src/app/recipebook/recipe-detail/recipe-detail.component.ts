import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe} from '../recipe.model';
import { ShoppinglistService} from '../../shared/shoppinglist.service';
import { RecipebookService } from '../../shared/recipebook.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdSnackBar } from '@angular/material';
import { CancelDialogComponent } from '../cancel-dialog/cancel-dialog.component';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  currentRecipe: Recipe;
  currentRecipeId: number;
  recipeSubscription: Subscription;

  // this is here so that we can display detailed currentRecipe data when the user selects a specific currentRecipe

  constructor( private shoppingService: ShoppinglistService,
               private recipeService: RecipebookService,
               private route: ActivatedRoute,
               private router: Router,
               public snackBar: MdSnackBar,
               public dialog: MdDialog ) { }

  ngOnInit() {

    // gets the id from the parameters of the route
    // uses this id to grab the currentRecipe from the currentRecipe service
    this.route.params
      .subscribe( (params: Params ) => {
        // stores the id for later use
        // the + operator castes the id string to a number
        this.currentRecipeId = +params['id'];

        // uses the id to get the currentRecipe from the service
        this.currentRecipe = this.recipeService.getLocalRecipebyIndex(this.currentRecipeId);

      });

    this.recipeSubscription = this.recipeService.getLocalRecipes()
      .subscribe(
        (recipes: Recipe[]) => {
          this.currentRecipe = recipes[this.currentRecipeId];
        }
      );
  }


  // take care of memory leak
  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
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

  // this actually deletes the recipe and takes the user back to recipe list
  onDeleteConfirm() {
    this.recipeService.deleteRecipe(this.currentRecipeId);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // snackbar notification that user added something to shopping list
  // thought there should be some kind of user feedback for this
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  // opens a modal so that the user doesn't accidentally delete recipes
  // deletion is currently irreversible
  onDeleteClicked() {
    const deleteDialog = this.dialog.open(CancelDialogComponent);
    deleteDialog.afterClosed()
      .subscribe(
        (result) => {
          console.log(result);
          if (result === 'yes') {
            this.onDeleteConfirm();
          }
        }
      );
  }

}
