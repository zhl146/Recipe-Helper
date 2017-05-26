import {Ingredient} from '../shared/ingredient.model';

export class Recipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
  steps: string[];
  prepTime: number;
  cookTime: number;

  constructor(name: string,
              description: string,
              imagePath: string,
              ingredients: Ingredient[],
              steps: string[],
              prepTime: number,
              cookTime: number) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.steps = steps;
    this.prepTime = prepTime;
    this.cookTime = cookTime;
  }

}
