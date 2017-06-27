import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import {RecipeBookDataService} from '../../shared/recipe-book-data.service';

import { Recipe } from '../recipe.model';

import {
  fadeInOut,
  growInOut,
  slideCollapseUpOut
} from '../../shared/animations';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  animations: [
    slideCollapseUpOut,
    fadeInOut,
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

  constructor( private recipeService: RecipeBookDataService,
               private fb: FormBuilder) { }

  // get the recipe and initializes the form for filtering
  ngOnInit() {
    this.recipeService.getLocalRecipes()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        ( recipes: Recipe[] ) => this.recipes = recipes );

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
    this.currentRecipeIndex = selectedRecipeIndex;
  }

  // clears the current user filter string
  clearFilter() {
    this.filterString = '';
  }
}
