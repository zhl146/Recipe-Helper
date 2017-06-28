import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { Recipe} from '../recipe.model';
import { ShoppinglistService} from '../../shared/shoppinglist.service';
import { RecipeBookDataService } from '../../shared/recipe-book-data.service';
import { ShoppingListItem } from '../../shoppinglist/shopping-list-item.model';

import { buttonClickFeedback, growInOut } from '../../shared/animations';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  animations: [
    growInOut,
    buttonClickFeedback
  ]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  currentRecipeIndex: number;
  currentRecipe: Recipe;
  clickedItem: number | null;

  constructor( private shoppingService: ShoppinglistService,
               private recipeService: RecipeBookDataService,
               private router: Router,
               private route: ActivatedRoute,
               public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentRecipeIndex = +params['id']; // (+) converts string 'id' to a number
      this.currentRecipe = this.recipeService.getLocalRecipebyIndex(this.currentRecipeIndex);
    });
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
  }

  // navigates to the edit component
  onEdit() {
    this.router.navigate(['recipes', this.currentRecipeIndex, 'edit']);
  }

  // occurs when user hits the back arrow to go back to recipe list
  // may need to nest components instead of route to save previous scroll state
  onBack() {
    this.router.navigate(['recipes']);
  }


  // toggles the fill in of the favorite heart
  onFavorite() {
    this.recipeService.toggleRecipeFav(this.currentRecipeIndex);
  }

  // adds all ingredients from the recipe to the list
  onAddAllIngredients() {
    this.openSnackBar('All ingredients added!', 'OK');
    this.shoppingService.addIngredientsFromRecipe(this.currentRecipe);
  }

  // adds a single ingredient to the shopping list
  onAddIngredient(ingredient: string, index: number) {
    this.openSnackBar('Ingredient added to list!', '');
    const newIngredient = new ShoppingListItem(false, ingredient);
    this.shoppingService.addIngredient(newIngredient);
    this.onClickedItem(index);
  }

  // snackbar notification that user added something to shopping list
  // thought there should be some kind of user feedback for this
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  // controls the animation for button feedback when adding single ingredients
  onClickedItem(index: number) {
    this.clickedItem = index;
    setTimeout( () => { this.clickedItem = null; }, 250);
  }
}
