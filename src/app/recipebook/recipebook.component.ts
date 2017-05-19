import { Component, OnInit } from "@angular/core"
import {Recipe} from "./recipe.model";

@Component({
  selector: 'app-recipe-book',
  templateUrl: "./recipebook.component.html",
  styleUrls:['./recipebook.component.css']
})

export class RecipeBookComponent implements OnInit {

  // this is the currently selected recipe that the user is viewing
  // it starts not defined by default, so the user does not see anything

  currentRecipe: Recipe;

  constructor() {

  }

  ngOnInit() {

  }

  // listens for a click event from the recipe list component
  // depending on what recipe the user clicks on, this will set the currently displayed recipe on the right hand pane

  onRecipeClick(recipe: Recipe) {
    this.currentRecipe = recipe;
  }

}
