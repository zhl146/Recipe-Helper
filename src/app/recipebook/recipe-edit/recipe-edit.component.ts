import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipebookService } from '../recipebook.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  currentRecipe: Recipe;

  id: number; // array id of the currentRecipe we are looking at if we are editing
  editMode = false; // true if we are editing an existing currentRecipe false if we are creating a new one

  constructor( private route: ActivatedRoute,
               private recipeService: RecipebookService,
               private router: Router) { }

  ngOnInit() {
    // parse the route to see if we are editing and if so which currentRecipe we are editing
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']; // stores id so that we can use it to get currentRecipe to edit later
          this.editMode = params['id'] != null; // sets the editing mode depending on whether we were passed params
        }
      );

    // pre-populates the currentRecipe if we are editing an existing currentRecipe
    if (this.editMode) {
      this.currentRecipe = this.recipeService.getRecipeByIndex(this.id);
    } else {
      this.currentRecipe = new Recipe('', '', '', [], [], null, null);
    }

    // calls form initialization function below to actually pre-populate the form if we are editing
    this.formInit();
  }

  formInit() {
    // declares the form arrays so we can pre-populate them if we need to
    const recIng = new FormArray([]);
    const recStep = new FormArray([]);

    // pre-populates the ingredients and steps if we are editing
    if (this.editMode) {
      for ( const ing of this.currentRecipe.ingredients) {
        recIng.push(
          new FormGroup({
            text: new FormControl(ing, Validators.required)
          })
        );
      }

      for ( const step of this.currentRecipe.steps) {
        recStep.push(
          new FormGroup({
            text: new FormControl(step, Validators.required)
          })
        );
      }
    }

    // set up all the different elements of the form group
    // everything is a control except the two form arrays
    this.recipeForm = new FormGroup({
      'recName': new FormControl(this.currentRecipe.name, [Validators.required]),
      'recDescription': new FormControl(this.currentRecipe.description),
      'recImgPath': new FormControl(this.currentRecipe.imagePath),
      'recPrep': new FormControl(this.currentRecipe.prepTime, Validators.required),
      'recCook': new FormControl(this.currentRecipe.cookTime, Validators.required),
      'recIng': recIng,
      'recStep': recStep
    });

    // calling a function that returns a function then executing it
    this.addItemFuncFactory('recStep')();
    this.addItemFuncFactory('recIng')();
  }

  // returns a function that pushes a new form group onto a form array
  // takes a string that is the name of the form array
  addItemFuncFactory(arrayName: string) {
    return () => {
      (<FormArray>this.recipeForm.get(arrayName)).push(
        new FormGroup({
          text: new FormControl(null)
        })
      );
    };
  }

  // returns true if the given index is the last index in the given form array
  isLastElement(index: number, arrayName: string) {
    return (index + 1) === (<FormArray>this.recipeForm.get(arrayName)).length;
  }

  // automatically adds a new form group to the end of an array
  autoAddNewItem(index: number, arrayName: string) {
    if (this.isLastElement(index, arrayName)) {
      this.addItemFuncFactory(arrayName)();
    }
  }

  // deletes the current index out of the given form array
  onDeleteClicked(index: number, arrayName: string) {
    if (!this.isLastElement(index, arrayName)) {
      (<FormArray>this.recipeForm.get(arrayName)).removeAt(index);
    }
  }

  // scrapes the data out of the forms and sends it to update the data service
  updateDataModel() {
    const ingredients: string[] = [];
    const steps: string[] = [];

    // get ingredient text
    for (const ingCtrl of (<FormArray>this.recipeForm.get('recIng')).controls) {
      ingredients.push(ingCtrl.get('text').value);
    }

    // the last element of the array is always empty, so we chomp it
    ingredients.pop();

    // get directions text
    for (const stepCtrl of (<FormArray>this.recipeForm.get('recStep')).controls) {
      steps.push(stepCtrl.get('text').value);
    }

    // the last element of the array is always empty, so we chomp it
    steps.pop();

    // update our local recipe before we send it off
    this.currentRecipe.name = this.recipeForm.get('recName').value;
    this.currentRecipe.description = this.recipeForm.get('recDescription').value;
    this.currentRecipe.imagePath = this.recipeForm.get('recImgPath').value;
    this.currentRecipe.prepTime = this.recipeForm.get('recPrep').value;
    this.currentRecipe.cookTime = this.recipeForm.get('recCook').value;
    this.currentRecipe.name = this.recipeForm.get('recName').value;
    this.currentRecipe.ingredients = ingredients;
    this.currentRecipe.steps = steps;

    // determines whether to add a recipe or update an existing one
    console.log(this.currentRecipe);
    console.log(this.id);
    if (this.editMode) {
      this.recipeService.editRecipe(this.currentRecipe, this.id);
    } else {
      this.recipeService.addRecipe(this.currentRecipe);
    }
  }

  // updates the data model and routes the user on submit
  onSubmit() {
    this.updateDataModel();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
