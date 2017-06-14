import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import {RecipebookService} from '../../shared/recipebook.service';
import { OptionsService } from '../../shared/options.service';

import { Recipe } from '../recipe.model';
import { ObservableMedia } from '@angular/flex-layout';
import { Subject } from 'rxjs/Subject';

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
  selectedIndex: number | null = null;

  // this is 2 way bound to user input
  // user can filter the recipe list using this string
  filterString: string;

  recipes: Recipe[] | Observable<Recipe[]>;

  constructor( private recipeService: RecipebookService,
               private router: Router,
               private route: ActivatedRoute,
               private optionsService: OptionsService,
               private fb: FormBuilder,
               private media: ObservableMedia ) { }

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

    this.recipeForm = this.fb.group({
      filter: this.fb.control('')
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // shows the current recipe detail
  onSelected(index: number) {
    this.selectedIndex = index;
    this.router.navigate([index], {relativeTo: this.route});
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
    return ( !this.media.isActive('xs') || this.selectedIndex === null );
  }

  onRecipeBack() {
    this.selectedIndex = null;
  }

}
