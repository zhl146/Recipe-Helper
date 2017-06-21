import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ObservableMedia } from '@angular/flex-layout';
import { Subject } from 'rxjs/Subject';

import {RecipeBookDataService} from '../../shared/recipe-book-data.service';
import { RecipeBookNavService } from '../recipe-book-nav.service';

import { Recipe } from '../recipe.model';

import {
  childAnimate,
  fabTranslate,
  fadeOut,
  favIconTransition,
  growInOut,
  slideCollapseUpOut,
  slideUpTop
} from '../../shared/animations';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  animations: [
    slideCollapseUpOut,
    fabTranslate,
    fadeOut,
    childAnimate,
    favIconTransition,
    slideUpTop,
    growInOut
  ]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  recipeForm: FormGroup;
  // index of selected recipe
  currentRecipeIndex: number | null = null;
  // this is 2 way bound to user input
  // user can filter the recipe list using this string
  filterString: string;
  recipes: Recipe[];

  recipeExpanded: boolean[] = [];

  constructor( private recipeService: RecipeBookDataService,
               private fb: FormBuilder,
               private media: ObservableMedia,
               private recipeNavService: RecipeBookNavService ) { }

  // get the recipe and initializes the form for filtering
  ngOnInit() {
    this.recipeService.getLocalRecipes()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (recipes: Recipe[]) => {
          let init = false;
          if (!this.recipes) {
            init = true;
          }

          this.recipes = recipes;

          // keep track of active recipe so we can remove elements from the dom
          // after animation is completed
          if (init) {
            this.recipeExpanded = this.recipes.map( item => false );
          }
        });

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
    if (selectedRecipeIndex !== this.currentRecipeIndex) {
      this.recipeNavService.onSelected(selectedRecipeIndex);
      this.recipeExpanded[selectedRecipeIndex] = true;
    }
  }

  onExitRecipeDetail() {
    this.recipeNavService.onSelected(null);
  }

  // clears the current user filter string
  clearFilter() {
    this.filterString = '';
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
  getFavIcon(recipeIndex: number) {
    return this.recipes[recipeIndex].favorite ? 'favorite' : 'favorite_border';
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

  // assigns state based on if recipe is the currently selected recipe
  getRecipeCollapseState(recipeIndex: number) {
    return (this.currentRecipeIndex === recipeIndex ? 'expanded' : 'collapsed');
  }

  // we use this method in order to clean up the collapsed
  // dom element instead of leaving it hidden
  // it listens for the animation done event
  cleanDom(event, recipeIndex: number) {
    if (event.toState === 'collapsed') {
      this.recipeExpanded[recipeIndex] = false;
    }
  }
}
