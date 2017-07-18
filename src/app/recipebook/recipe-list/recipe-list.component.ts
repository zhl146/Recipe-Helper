import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import {RecipeBookDataService} from '../../shared/recipe-book-data.service';

import { Recipe } from '../recipe.model';

import {
  growInOut,
} from '../../shared/animations';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  animations: [
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
  recipeVisible: boolean[];
  recipes: Recipe[];

  constructor( private recipeService: RecipeBookDataService,
               private fb: FormBuilder) { }

  // get the recipe and initializes the form for filtering
  ngOnInit() {
    this.recipeService.getLocalRecipes()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        ( recipes: Recipe[] ) => {
          this.recipes = recipes;
          this.recipeVisible = this.recipes.map( () => true);
        } );

    this.recipeForm = this.fb.group({
      filter: this.fb.control('')
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // clears the current user filter string
  clearFilter() {
    this.filterString = '';
  }

  filterRecipes() {
      const reg = new RegExp(this.filterString, 'i');
      this.recipeVisible = this.recipes.map( (recipe) => reg.test(recipe.name) );
  }
}
