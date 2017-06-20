import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ObservableMedia } from '@angular/flex-layout';
import { Subject } from 'rxjs/Subject';

import {RecipeBookDataService} from '../../shared/recipe-book-data.service';
import { OptionsService } from '../../shared/options.service';
import { RecipeBookNavService } from '../recipe-book-nav.service';

import { Recipe } from '../recipe.model';

import { fabRotate, fabTranslate, fadeDown, moveToTop, slideCollapseUpOut } from '../../shared/animations';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  animations: [
    fabRotate,
    slideCollapseUpOut,
    moveToTop,
    fabTranslate,
    fadeDown
  ]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  recipeForm: FormGroup;
  // display the welcome box or not
  recipeInfo: boolean;
  // index of selected recipe
  currentRecipeIndex: number | null = null;
  // this is 2 way bound to user input
  // user can filter the recipe list using this string
  filterString: string;
  recipes: Recipe[];

  recipeExpanded: boolean[] = [];

  animationStateTracker: [{animationDone: boolean, state: string}];

  constructor( private recipeService: RecipeBookDataService,
               private optionsService: OptionsService,
               private fb: FormBuilder,
               private media: ObservableMedia,
               private recipeNavService: RecipeBookNavService ) { }

  // get the recipe and initializes the form for filtering
  ngOnInit() {
    this.recipeService.getLocalRecipes()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
          // keep track of active recipe so we can remove elements from the dom
          // after animation is completed
          for (let i = 0; i < recipes.length; i++) {
              this.recipeExpanded[i] = false;
          }
        });

    this.optionsService.getOptionsObs()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (options) => {
          this.recipeInfo = options.recipeInfo;
        }
      );

    this.recipeNavService.getCurrentRecipeObs()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (currentRecipeIndex) => {
          this.currentRecipeIndex = currentRecipeIndex;
        }
      );

    this.recipeForm = this.fb.group({
      filter: this.fb.control('')
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // shows the current recipe detail
  onSelected(selectedRecipeIndex: number) {
    if (this.currentRecipeIndex === selectedRecipeIndex) {
      this.recipeNavService.onNavigateStop();
    } else {
      this.recipeNavService.onSelected(selectedRecipeIndex);
      this.recipeExpanded[selectedRecipeIndex] = true;
    }
  }

  // clears the current user filter string
  clearFilter() {
    this.filterString = '';
  }

  onGotIt() {
    this.optionsService.disableRecipeInfo();
  }

  listDisplay() {
    return ( !(this.media.isActive('xs') || this.media.isActive('sm') ) || this.currentRecipeIndex === null );
  }

  // toggles favorite status of current recipe
  onFavorite() {
    this.recipeService.toggleRecipeFav(this.currentRecipeIndex);
  }

  // method returns strings corresponding to icons depending on whether the current recipe
  // is a favorite recipe or not
  getFavIcon() {
    return this.recipes[this.currentRecipeIndex].favorite ? 'favorite' : 'favorite_border';
  }

  // gets the state depending on whether the current recipe is a favorite
  getfavState() {
    return this.recipes[this.currentRecipeIndex].favorite ? 'red' : 'white';
  }

  // returns active if the current recipe index matches the given index
  // allows us to change animation states
  getRecipeItemState(recipeIndex: number) {
    return this.currentRecipeIndex === recipeIndex ? 'active' : 'inactive';
  }

  activateRecipe(recipeIndex: number) {
    this.recipeExpanded[recipeIndex] = true;
  }

  deactivateRecipe(recipeIndex: number) {
    this.recipeExpanded[recipeIndex] = false;
  }

  getRecipeDetailDomState(recipeIndex: number) {
    return this.recipeExpanded[recipeIndex];
  }

  getRecipeCollapseState(recipeIndex: number) {
    return (this.currentRecipeIndex === recipeIndex ? 'expanded' : 'collapsed');
  }

  cleanDom(event, recipeIndex: number) {
    console.log('cleaning dom')
    if (event.toState === 'collapsed') {
      this.recipeExpanded[recipeIndex] = false;
    }
  }

}
