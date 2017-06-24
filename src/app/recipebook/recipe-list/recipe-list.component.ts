import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import {RecipeBookDataService} from '../../shared/recipe-book-data.service';
import { RecipeBookNavService } from '../recipe-book-nav.service';

import { Recipe } from '../recipe.model';

import {
  fadeOut,
  growInOut,
  slideCollapseUpOut
} from '../../shared/animations';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  animations: [
    slideCollapseUpOut,
    fadeOut,
    growInOut
  ]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  @ViewChildren('recipeCard') cardElRefs: QueryList<any>;

  recipeForm: FormGroup;

  // index of selected recipe
  currentRecipeIndex: number | null = null;

  // this is 2 way bound to user input
  // user can filter the recipe list using this string
  filterString: string;
  recipes: Recipe[];

  detailExpanded = false;

  constructor( private recipeService: RecipeBookDataService,
               private fb: FormBuilder,
               private recipeNavService: RecipeBookNavService ) { }

  // get the recipe and initializes the form for filtering
  ngOnInit() {
    this.recipeService.getLocalRecipes()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        ( recipes: Recipe[] ) => this.recipes = recipes );

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

  // navigates to the current recipe detail
  onSelected(selectedRecipeIndex: number) {
    const currentElement = this.cardElRefs.toArray()[selectedRecipeIndex].nativeElement;
    this.recipeNavService.saveCurrentRecipeCardOffset(currentElement);
    this.recipeNavService.onSelected(selectedRecipeIndex);
  }

  // clears the current user filter string
  clearFilter() {
    this.filterString = '';
  }
}
