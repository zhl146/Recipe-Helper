import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Recipe } from '../recipe.model';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  // this will emit a recipe
  @Output() recipeClick = new EventEmitter<Recipe>();


  // dummy recipe list
  // will most likely be pulled from a data service that makes http calls to a server
  recipes: Recipe[] = [
    new Recipe('Recipe 1', 'Im sure this is something good',
      'http://maxpixel.freegreatpicture.com/static/photo/1x/Cocktail-Party-Recipe-Alcohol-Drink-Pisco-Sour-833896.jpg',
      [new Ingredient('apple', 3, ''), new Ingredient('butter', 3, 'tablespoons')]),
    new Recipe('Recipe 2', 'Im sure this is something good too',
      'http://maxpixel.freegreatpicture.com/static/photo/1x/Cocktail-Party-Recipe-Alcohol-Drink-Pisco-Sour-833896.jpg',
      [new Ingredient('pear', 3, ''), new Ingredient('butter', 3, 'tablespoons')])
  ];

  constructor() { }

  ngOnInit() {
  }

  // emits an event when a user clicks on a specific recipe in the list
  // passes the recipe that has been clicked on

  onDetailRequest(clickedRecipe: Recipe) {
    this.recipeClick.emit(clickedRecipe);
  }

}
