import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { RecipebookService } from '../recipebook.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  recipe: Recipe;

  id: number; // array id of the recipe we are looking at if we are editing
  editMode = false; // true if we are editing an existing recipe false if we are creating a new one

  constructor( private route: ActivatedRoute,
               private recipeService: RecipebookService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']; // stores id so that we can use it to get recipe to edit later
          this.editMode = params['id'] != null; // sets the editing mode depending on whether we were passed params
        }
      );

    if (this.editMode) {
      this.recipe = this.recipeService.getRecipeByIndex(this.id);
    } else {
      this.recipe = new Recipe('', '', '', [], [], null, null);
    }

    this.formInit();
  }

  formInit() {
    const recIng = new FormArray([]);
    const recStep = new FormArray([]);

    if (this.editMode) {
      for ( const ing of this.recipe.ingredients) {
        recIng.push(
          new FormGroup({
            text: new FormControl(ing)
          })
        );
      }

      for ( const step of this.recipe.steps) {
        recStep.push(
          new FormGroup({
            text: new FormControl(step)
          })
        );
      }
    }

    this.recipeForm = new FormGroup({
      'recName': new FormControl(this.recipe.name),
      'recDescription': new FormControl(this.recipe.description),
      'recImgPath': new FormControl(this.recipe.imagePath),
      'recPrep': new FormControl(this.recipe.prepTime),
      'recCook': new FormControl(this.recipe.cookTime),
      'recIng': recIng,
      'recStep': recStep
    });

    this.addItemFuncFactory('recStep')();
    this.addItemFuncFactory('recIng')();
  }

  addItemFuncFactory(arrayName: string) {
    return () => {
      (<FormArray>this.recipeForm.get(arrayName)).push(
        new FormGroup({
          text: new FormControl(null)
        })
      );

      console.log(<FormArray>this.recipeForm.get(arrayName));

    };
  }

  isLastElement(index: number, arrayName: string) {
    return (index + 1) === (<FormArray>this.recipeForm.get(arrayName)).length;
  }

  autoAddNewItem(index: number, arrayName: string) {
    if (this.isLastElement(index, arrayName)) {
      (<FormArray>this.recipeForm.get(arrayName)).push(
        new FormGroup({
          text: new FormControl(null)
        })
      );
    }
  }

  onDeleteClicked(index: number, arrayName: string) {
    if (!this.isLastElement(index, arrayName)) {
      (<FormArray>this.recipeForm.get(arrayName)).removeAt(index);
    }
  }

  updateDataModel() {
    const ingredients: string[] = [];
    const steps: string[] = [];

    for (const ingCtrl of (<FormArray>this.recipeForm.get('recIng')).controls) {
      ingredients.push(ingCtrl.get('text').value);
    }

    ingredients.pop();

    for (const stepCtrl of (<FormArray>this.recipeForm.get('recStep')).controls) {
      steps.push(stepCtrl.get('text').value);
    }

    steps.pop();

    this.recipe.name = this.recipeForm.get('recName').value;
    this.recipe.description = this.recipeForm.get('recDescription').value;
    this.recipe.imagePath = this.recipeForm.get('recImgPath').value;
    this.recipe.prepTime = this.recipeForm.get('recPrep').value;
    this.recipe.cookTime = this.recipeForm.get('recCook').value;
    this.recipe.name = this.recipeForm.get('recName').value;
    this.recipe.ingredients = ingredients;
    this.recipe.steps = steps;

    console.log(this.recipe);
    console.log(this.id);
    if (this.editMode) {
      this.recipeService.editRecipe(this.recipe, this.id);
    } else {
      this.recipeService.addRecipe(this.recipe);
    }
  }
}
