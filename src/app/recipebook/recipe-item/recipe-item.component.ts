import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import { RecipebookService } from '../recipebook.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() index: number; // the array index of the recipe item

  recipeItem: Recipe; // the recipe to be displayed

  constructor( private recipeService: RecipebookService ) { }

  ngOnInit() {
    // gets the recipe item from the recipe service by index
    this.recipeItem = this.recipeService.getRecipeByIndex(this.index);
  }

}
