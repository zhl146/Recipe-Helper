import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RecipeBookDataService } from '../shared/recipe-book-data.service';

@Injectable()
export class RecipeBookNavService {

  private currentRecipeStream = new BehaviorSubject<number | null>(null);

  constructor( private recipeDataService: RecipeBookDataService,
               private router: Router ) { }

  getCurrentRecipeObs() {
    return this.currentRecipeStream.asObservable();
  }

  set currentRecipeIndex(recipeIndex: number | null) {
    this.currentRecipeStream.next(recipeIndex);
  }

  onSelected(selectedRecipeIndex: number | null) {
    if ( selectedRecipeIndex !== null ) {
      this.currentRecipeStream.next(selectedRecipeIndex);
    } else {
      this.currentRecipeStream.next(null);
    }
  }

  onNavigateNext() {
    const numRecipes = this.recipeDataService.getNumrecipes();
    const currentRecipeIndex = this.currentRecipeStream.getValue();
    let newRecipeIndex = currentRecipeIndex + 1;
    if ( (currentRecipeIndex + 1) === numRecipes ) {
      newRecipeIndex = 0;
    }
    this.onSelected(newRecipeIndex);
  }

  onNavigateBack() {
    const numRecipes = this.recipeDataService.getNumrecipes();
    const currentRecipeIndex = this.currentRecipeStream.getValue();
    let newRecipeIndex = currentRecipeIndex - 1;
    if ( newRecipeIndex < 0 ) {
      newRecipeIndex = numRecipes - 1;
    }
    this.onSelected(newRecipeIndex);
  }

  onNavigateStop() {
    this.onSelected(null);
  }

}
