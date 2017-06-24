import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RecipeBookDataService } from '../shared/recipe-book-data.service';

@Injectable()
export class RecipeBookNavService {

  private currentRecipeStream = new BehaviorSubject<number | null>(null);

  private recipeCardOffset;

  constructor( private recipeDataService: RecipeBookDataService ) { }

  getCurrentRecipeObs() {
    return this.currentRecipeStream.asObservable();
  }

  onSelected(selectedRecipeIndex: number | null) {
    this.currentRecipeStream.next(selectedRecipeIndex);
    if (selectedRecipeIndex !== null) {
      // this.router.navigate(['/recipes', selectedRecipeIndex]);
    } else {
      // this.router.navigate(['recipes']);
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

  saveCurrentRecipeCardOffset(element) {
    this.recipeCardOffset = element.getBoundingClientRect();
    console.log(this.recipeCardOffset);
  }

  getRecipeCardOffset() {
    return this.recipeCardOffset;
  }

}
