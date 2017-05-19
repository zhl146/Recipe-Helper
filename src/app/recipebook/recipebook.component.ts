import { Component, OnInit } from "@angular/core"
import {Recipe} from "./recipe.model";
import {RecipebookService} from "./recipebook.service";

@Component({
  selector: 'app-recipe-book',
  templateUrl: "./recipebook.component.html",
  styleUrls:['./recipebook.component.css'],
  providers:[RecipebookService]
})

export class RecipeBookComponent implements OnInit {

  // this is the currently selected recipe that the user is viewing
  // it starts not defined by default, so the user does not see anything

  currentRecipe: Recipe;

  constructor( private recipeService: RecipebookService) {

  }

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe)=>{
        this.currentRecipe = recipe;
    })
  }

}
