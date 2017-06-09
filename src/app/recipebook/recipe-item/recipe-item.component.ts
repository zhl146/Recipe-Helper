import { Component, Input } from '@angular/core';
import {Recipe} from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  @Input() index: number;
  @Input() recipeItem: Recipe;

  constructor( private router: Router,
               private route: ActivatedRoute ) {}

  onRecipeSelect() {
    this.router.navigate([this.index], {relativeTo: this.route})
      .then(
        () => document.getElementById('recipeDetail').scrollIntoView()
        );
  }
}
