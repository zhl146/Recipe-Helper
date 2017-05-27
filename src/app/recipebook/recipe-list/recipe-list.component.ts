import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipebookService} from '../recipebook.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  recipeSubscription: Subscription;

  constructor( private recipeService: RecipebookService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    this.recipeSubscription = this.recipeService.recipeSubject
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
  }

  onSelected(index: number) {
    this.router.navigate([index], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

}
