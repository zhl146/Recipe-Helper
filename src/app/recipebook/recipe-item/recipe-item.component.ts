import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  // this is here so that the we can display some quick data about the recipe

  @Input() recipeItem: Recipe;

  constructor() { }

  ngOnInit() {
  }

}
