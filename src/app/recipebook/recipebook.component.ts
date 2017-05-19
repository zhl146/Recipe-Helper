import { Component, OnInit } from "@angular/core"
import {Recipe} from "./recipe.model";

@Component({
  selector: 'app-recipe-book',
  templateUrl: "./recipebook.component.html",
  styleUrls:['./recipebook.component.css']
})

export class RecipeBookComponent implements OnInit {

  currentRecipe: Recipe;

  constructor() {

  }

  ngOnInit() {

  }

  onRecipeClick(recipe: Recipe) {
    this.currentRecipe = recipe;
  }

}
