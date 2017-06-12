import { Component, Input } from '@angular/core';
import {Recipe} from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  @Input() index: number;
  @Input() recipeItem: Recipe;

  constructor( private router: Router,
               private route: ActivatedRoute,
               private media: ObservableMedia) {}

  // displays the selected recipe details
  onRecipeSelect() {
    this.router.navigate([this.index], {relativeTo: this.route})
      .then(
        () => {
          // only autoscroll to recipe if the user is on a device
          // that can't support the double column layout
          // this is to improve the user experience in case the user has many recipes
          if (this.media.isActive('xs') || this.media.isActive('sm')) {
            // setting a timeout so that the component has a chance to load
            // could probably hook into the component loading event
            // but this is just easier and should work for most use cases
            setTimeout(
              () => document.getElementById('recipeDetail').scrollIntoView(),
              100
            );
          }
        }
        );
  }

  getReadyTime() {
    return this.recipeItem.prepTime + this.recipeItem.cookTime;
  }

}
