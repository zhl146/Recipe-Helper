import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppinglistService} from '../../shoppinglist/shoppinglist.service';
import { RecipebookService } from '../recipebook.service';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  currentRecipe: Recipe;

  // this is here so that we can display detailed recipe data when the user selects a specific recipe

  constructor( private shoppingService: ShoppinglistService,
               private recipeService: RecipebookService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('params: ' + this.route.snapshot.params['id']);
    this.currentRecipe = this.recipeService.getRecipeByIndex(+this.route.snapshot.params['id']);

    this.route.params.subscribe( (params: Params ) => {
      this.currentRecipe = this.recipeService.getRecipeByIndex(+params['id']);
    });
  }

  onAddAllClicked() {
    this.shoppingService.addIngredientsFromRecipe(this.currentRecipe);
  }

}
