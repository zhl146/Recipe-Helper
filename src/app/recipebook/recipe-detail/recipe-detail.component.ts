import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { Recipe} from '../recipe.model';
import { ShoppinglistService} from '../../shared/shoppinglist.service';
import { RecipeBookDataService } from '../../shared/recipe-book-data.service';
import { ShoppingListItem } from '../../shoppinglist/shopping-list-item.model';

import { growInOut } from '../../shared/animations';
import { RecipeBookNavService } from '../recipe-book-nav.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  animations: [
    growInOut
  ]
})
export class RecipeDetailComponent implements OnInit {
  @ViewChild('container') detailContainer: ElementRef;
  @Input('currentRecipe') currentRecipe: Recipe;
  @Input('currentRecipeIndex') currentRecipeIndex: number;

  private initialPos;

  // this is here so that we can display detailed currentRecipe data when the user selects a specific currentRecipe

  constructor( private shoppingService: ShoppinglistService,
               private recipeService: RecipeBookDataService,
               private recipeNavService: RecipeBookNavService,
               public snackBar: MdSnackBar) { }

  ngOnInit() {
    // get initial position of card and set it
    this.initialPos = this.recipeNavService.getRecipeCardOffset();
    this.detailContainer.nativeElement.style.left = this.initialPos.left + 'px';
    this.detailContainer.nativeElement.style.top = this.initialPos.top + 'px';
    this.detailContainer.nativeElement.style.width = this.initialPos.width + 'px';
    this.detailContainer.nativeElement.style.height = this.initialPos.height + 'px';
    document.body.style.overflow = 'hidden';

    // TODO will add something here to vary the transition time according to how much the height/width changes

    // need a delay or element will not animate
    // set new dimensions and location
    // TODO make motion more dynamic
    setTimeout(
      () => {
        this.detailContainer.nativeElement.style.left = 0;
        this.detailContainer.nativeElement.style.top = 0;
        this.detailContainer.nativeElement.style.width = '100vw';
        this.detailContainer.nativeElement.style.height = '100vh';
        this.detailContainer.nativeElement.style.overflow = 'auto';
      }, 50
    );


  }

  // occurs when user hits the back arrow to go back to recipe list
  // may need to nest components instead of route to save previous scroll state
  onBack() {
    this.detailContainer.nativeElement.style.left = this.initialPos.left + 'px';
    this.detailContainer.nativeElement.style.top = this.initialPos.top + 'px';
    this.detailContainer.nativeElement.style.width = this.initialPos.width + 'px';
    this.detailContainer.nativeElement.style.height = this.initialPos.height + 'px';
    document.body.style.overflow = 'auto';
    setTimeout(
      () => { this.recipeNavService.onNavigateStop(); }, 180
    );
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
  onAddIngredient(ingredient: string) {
    this.openSnackBar('Ingredient added to list!', '');
    const newIngredient = new ShoppingListItem(false, ingredient);
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
