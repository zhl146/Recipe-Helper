import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { Recipe} from '../recipe.model';
import { ShoppinglistService} from '../../shared/shoppinglist.service';
import { RecipeBookDataService } from '../../shared/recipe-book-data.service';
import { ShoppingListItem } from '../../shoppinglist/shopping-list-item.model';

import { growInOut } from '../../shared/animations';
import { RecipeBookNavService } from '../recipe-book-nav.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  animations: [
    growInOut
  ]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  @ViewChild('detail') detailCard: ElementRef;
  @ViewChild('container') detailOverlay: ElementRef;
  @Input('currentRecipe') currentRecipe: Recipe;
  @Input('currentRecipeIndex') currentRecipeIndex: number;

  private initialPos;
  private viewWidth;

  // this is here so that we can display detailed currentRecipe data when the user selects a specific currentRecipe

  constructor( private shoppingService: ShoppinglistService,
               private recipeService: RecipeBookDataService,
               private recipeNavService: RecipeBookNavService,
               private router: Router,
               public snackBar: MdSnackBar) { }

  ngOnInit() {
    // get initial position of card and set it
    this.initialPos = this.recipeNavService.getRecipeCardOffset();
    this.detailCard.nativeElement.style.left = this.initialPos.left + 'px';
    this.detailCard.nativeElement.style.top = this.getCorrectedOffsetTop();
    this.detailCard.nativeElement.style.width = this.initialPos.width + 'px';
    this.detailCard.nativeElement.style.height = this.initialPos.height + 'px';
    this.detailCard.nativeElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    this.viewWidth = document.body.clientWidth;

    // TODO will add something here to vary the transition time according to how much the height/width changes
    // TODO change as many units to percentages as possible in order to keep responsive behavior on this view
    // TODO add animation steps:
    // 1 set initial positions of element
    // 2 set the background overlay
    //  for phones - detail can be 100% width and height, so overlay doesn't matter
    //  for larger devices - detail should be smaller and not take up the entire vw
    // 3 animate detail card into centered position
    //  width should probably animate first, then height - height will take longer
    //  on devices ~800px and smaller vw, detail should be similar to initial card width
    //  on devices 800px and greater vw, detail can be double width

    // need a delay or element will not animate
    // set new dimensions and location
    // // TODO make motion more dynamic
    setTimeout(
      () => {
        this.detailOverlay.nativeElement.style.opacity = 1;
        this.detailCard.nativeElement.style.left = this.getCenteredLeft();
        this.detailCard.nativeElement.style.width = this.initialPos.width + 20 + 'px';
        this.detailCard.nativeElement.style.top = this.getCorrectedEndingOffsetTop();
        this.detailCard.nativeElement.style.height = '100vh';
      }, 20
    );

    setTimeout(
      () => {
        this.detailCard.nativeElement.style.overflow = 'auto';
      }, 150
    );

  }

  ngOnDestroy() {
    // otherwise the document will not be scrollable
    console.log('detail component destroyed');
    document.body.style.overflow = 'auto';
  }

  onEdit() {
    document.body.style.overflow = 'auto';
    this.router.navigate(['recipes', this.currentRecipeIndex, 'edit']);
  }

  // occurs when user hits the back arrow to go back to recipe list
  // may need to nest components instead of route to save previous scroll state
  onBack() {
    this.detailCard.nativeElement.style.overflow = 'hidden';
    this.detailCard.nativeElement.style.left = this.initialPos.left + 'px';
    this.detailCard.nativeElement.style.top = this.getCorrectedOffsetTop();
    this.detailCard.nativeElement.style.width = this.initialPos.width + 'px';
    this.detailCard.nativeElement.style.height = this.initialPos.height + 'px';
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

  getCenteredLeft() {
    // returns the average of the total margin so we get the right offset
    const rightOffset = this.viewWidth - this.initialPos.right;
    const totalMargin = this.initialPos.left + rightOffset;
    return totalMargin / 2 - 10 + 'px';
  }

  // corrects for either the toolbar or toolbar + navbar offset
  getCorrectedOffsetTop() {
    if (document.body.offsetWidth > 599) {
      return this.initialPos.top - 64 + 'px';
    } else {
      return this.initialPos.top - 64 - 49 + 'px';
    }
  }

  getCorrectedEndingOffsetTop() {
    return '0px';
    // if (document.body.offsetWidth > 767) {
    //   return '10px';
    // } else {
    //   return '-113px';
    // }
  }

  // this should set the local private object that holds
  // the information to position the dom element in the same place it started
  setInitialState() {

  }

  // this should set the local private object that holds
  // the information to position the dom element in its final state
  // after the animation
  setFinalState() {

  }

  // this should set the local private object that holds
  // the information about the transition durations and timing curves
  setTransitionStrings() {

  }

}
