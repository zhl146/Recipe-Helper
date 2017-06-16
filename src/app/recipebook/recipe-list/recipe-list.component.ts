import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {RecipeBookDataService} from '../../shared/recipe-book-data.service';
import { OptionsService } from '../../shared/options.service';

import { Recipe } from '../recipe.model';
import { ObservableMedia } from '@angular/flex-layout';
import { Subject } from 'rxjs/Subject';
import { RecipeBookNavService } from '../recipe-book-nav.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
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

  constructor( private recipeService: RecipeBookDataService,
               private router: Router,
               private route: ActivatedRoute,
               private optionsService: OptionsService,
               private fb: FormBuilder,
               private media: ObservableMedia,
               private recipeNavService: RecipeBookNavService) { }

  // get the recipe and initializes the form for filtering
  ngOnInit() {
    this.recipeService.getLocalRecipes()
      .takeUntil(this.ngUnsubscribe)
      .subscribe( (recipes: Recipe[]) => this.recipes = recipes);

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
    this.recipeNavService.currentRecipeIndex = selectedRecipeIndex;
    this.router.navigate([selectedRecipeIndex], {relativeTo: this.route});
  }

  // clears the current user filter string
  clearFilter() {
    this.filterString = '';
  }

  onGotIt() {
    this.optionsService.disableRecipeInfo();
  }

  // getReadyTime(index: number) {
  //   return this.recipes[index].prepTime + this.recipes[index].cookTime;
  // }

  listDisplay() {
    return ( !this.media.isActive('xs') || this.currentRecipeIndex === null );
  }

  onRecipeClose() {
    this.recipeNavService.currentRecipeIndex = null;
    this.router.navigate(['recipes']);
  }

  onNextRecipe() {
    if ( (this.currentRecipeIndex + 1) === this.recipes.length ) {
      console.log('reached the end, going to start');
      this.onSelected(0);
    } else {
      console.log('going to next ' + this.currentRecipeIndex++);
      this.onSelected(this.currentRecipeIndex++);
    }
  }

  onPreviousRecipe() {
    if ( this.currentRecipeIndex === 0 ) {
      console.log('reached the start, going to end: ' + (this.recipes.length - 1));
      this.onSelected(this.recipes.length - 1);
    } else {
      console.log('going to previous ' + this.currentRecipeIndex--);
      this.onSelected(this.currentRecipeIndex--);
    }
  }

}
