import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';
import { RecipebookService } from '../recipebook.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, OnDestroy {

  @Input() index: number; // the array index of the currentRecipe item

  recipeItem: Recipe; // the currentRecipe to be displayed

  recipeSubscription: Subscription;

  constructor( private recipeService: RecipebookService ) { }

  ngOnInit() {
    // gets the currentRecipe item from the currentRecipe service by index
    this.recipeItem = this.recipeService.getRecipeByIndex(this.index);

    this.recipeSubscription = this.recipeService.recipeSubject
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeItem = recipes[this.index];
        }
      );
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

}
