import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { AppHttpService } from '../shared/http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Response } from '@angular/http';

// this is the recipe data service
// it holds the recipes array and shares it among all subscribers
@Injectable()
export class RecipebookService {
  private recipeList = new BehaviorSubject<Recipe[]>([]);

  // some recipes that a new user will start with so that the app doesn't look so empty
  private stockRecipes: Recipe[] = [
    {
      name: 'Best Steak Marinade in Existence',
      description: `This is a family recipe that has been developed only over the last 5 years. 
      In this short time it's made me famous in our close circle, but until now I've never shared it with anyone.`,
      imagePath: 'http://i242.photobucket.com/albums/ff231/bour3/things%20I%20made%20then%20ate/steak-asparagus.jpg',
      ingredients: [
        '1/3 cup soy sauce',
        '1/2 cup olive oil',
        '1/3 cup fresh lemon juice',
        '1/4 cup worcerstershire sauce',
        '1 1/2 tablespoons garlic powder',
        '3 tablespoons dried basil',
        '1 1/2 tablespoons dried parsley flakes',
        '1 teaspoon ground white pepper',
        '1/4 teaspoon hot pepper sauce (optional)',
        '1 teaspoon dried minced garlic (optional)'
      ],
      steps: [
        'Place the soy sauce, olive oil, lemon juice, worcestershire sauce, garlic powder, basil, parsley, and pepper in a blender',
        'Add hot pepper sauce and garlic if desired.',
        'Blend on high speed for 30 seconds until thoroughly mixed.',
        'Pour marinade over desired type of meat.',
        'Cover and refrigerate for up to 8 hours.',
        'Cook meat as desired.'
      ],
      prepTime: 15,
      cookTime: 0
    },
    {
      name: 'Peach Cobbler',
      description: 'This is a wonderful Southern recipe...very easy and tastes great!',
      imagePath: 'http://i91.photobucket.com/albums/k309/Davydd_2006/BEE%20Social%20LA/SmithsPeachCobbler.jpg',
      ingredients: [
        '1 cup all-purpose flour',
        '1/2 cup brown sugar',
        '1/2 cup white sugar',
        '2 teaspoons baking powder',
        '1/2 teaspoon salt',
        '1 teaspoon vanilla extract',
        '3/4 cup milk',
        '1/2 cup margarine, melted',
        '1 (29 oz) can sliced canned peaches, drained',
        '1 teaspoon ground cinnamon'
      ],
      steps: [
        'Preheat oven to 400 degrees F (200 degrees C).',
        'Grease a 9x9-inch baking dish.',
        'In a large bowl, combine flour, brown sugar, white sugar, baking powder, salt, and vanilla.',
        'Pour milk into dry ingredients, and then stir in melted margarine. Mix thoroughly.',
        'Pour mixture into prepared baking pan.',
        'Arrange peaches on top and sprinkle with cinnamon.',
        'Bake in preheated oven until golden brown, about 30 minutes.'
      ],
      prepTime: 15,
      cookTime: 30
    },
    {
      name: 'Slow Cooker Beef Stroganoff',
      description: `This is an easy variation of a favorite. I used to prepare it the traditional way, with sour cream, 
      but I didn't have any one night, so I used cream cheese instead. 
      My husband and I liked it even better! Serve over hot, cooked egg noodles or rice.`,
      imagePath: 'http://i305.photobucket.com/albums/nn211/hetroclite/Mouthwatering/East%20European/BeefStroganoff-CC_zpsordocvzc.jpg',
      ingredients: [
        '1 pound cubed beef stew meat',
        '1 (10.75 oz) can of condensed golden mushroom soup',
        '1/2 cup chopped onion',
        '1 tablespoon worcestershire sauce',
        '1/4 cup water',
        '4 oz cream cheese'
      ],
      steps: [
        'Throw everything in a slow cooker EXCEPT the cream cheese',
        'Cook on low setting for 8 hours',
        'Stir in cream cheese just before serving'
      ],
      prepTime: 10,
      cookTime: 480
    }
  ];

  constructor( private http: AppHttpService ) {
    this.http.getRecipes()
      .subscribe(
        (recipes) => {
          if (recipes) {
            this.recipeList.next(recipes);
          } else {
            this.recipeList.next(this.stockRecipes);
          }
        }
      );
  }

  uploadStockRecipes() {
    this.http.saveRecipes(this.stockRecipes);
  }

  getRecipes() {
    return this.recipeList.asObservable();
  }

  // returns a specific recipe
  getRecipeByIndex(recIndex: number): Recipe {
    return this.recipeList.getValue()[recIndex];
  }

  // adds a recipe to the end of the array and updates all subscribers
  addRecipe(recipe: Recipe) {
    let updatedRecipes = this.recipeList.getValue();
    if (!updatedRecipes) {
      updatedRecipes = [];
    }
    updatedRecipes.push(recipe);
    this.recipeList.next(updatedRecipes);
    this.updateServer();
  }

  // deletes a recipe out of the array by index and updates all subscribers
  deleteRecipe(index: number) {
    const updatedRecipes = this.recipeList.getValue();
    updatedRecipes.splice(index, 1);
    this.recipeList.next(updatedRecipes);
    this.updateServer();
  }

  // updates a specific recipe in the array by index and updates all subscribers
  editRecipe(changedRecipe: Recipe, recipeIndex: number) {
    const updatedRecipes = this.recipeList.getValue();
    updatedRecipes[recipeIndex] = changedRecipe;
    this.recipeList.next(updatedRecipes);
    this.updateServer();
  }

  updateServer() {
    const recipes = this.recipeList.getValue();
    recipes.sort(
      (a, b) => {
        if (a > b) {
          return +1;
        } else if (a < b) {
          return -1;
        } else {
          return 0;
        }
      }
    );
    this.http.saveRecipes(this.recipeList.getValue())
      .subscribe(
        ( response: Response) => {
          console.log(response);
        }
      );
  }

  newUserRecipeInit() {
    this.http.saveRecipes([])
      .subscribe(
        response => console.log(response)
      );
  }

}
