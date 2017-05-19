import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // this is here so that we can display detailed recipe data when the user selects a specific recipe

  @Input() currentRecipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

}
