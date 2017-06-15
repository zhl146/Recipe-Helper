export class Recipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: string[];
  steps: string[];
  prepTime: number;
  cookTime: number;
  favorite: boolean;

  constructor(name: string,
              description: string,
              imagePath: string,
              ingredients: string[],
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
    this.favorite = false;
  }

}
