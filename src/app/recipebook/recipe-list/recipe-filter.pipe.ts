import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../recipe.model';

@Pipe({
  name: 'recipeFilter',
  pure: false
})
export class RecipeFilterPipe implements PipeTransform {
  transform(recipes: Recipe[], filterString: string) {
    if (recipes.length === 0) {
      return recipes;
    }
    const filteredRecipes: Recipe[] = [];
    const reg = new RegExp(filterString, 'i');
    for (const recipe of recipes) {
      if ( reg.test(recipe.name) ) {
        filteredRecipes.push(recipe);
      }
    }
    return filteredRecipes;
  }
}
