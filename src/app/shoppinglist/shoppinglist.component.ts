import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { ShoppinglistService } from './shoppinglist.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit, OnDestroy {

  ingredients: string[];
  private ingredientSubscription: Subscription;

  formGroup: FormGroup;
  ingredientArray: FormArray;

  constructor( private shoppingService: ShoppinglistService ) { }

  // component lifecycle hooks
  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.ingredientSubscription = this.shoppingService.ingredientsSubject
      .subscribe(
        (ingredients: string[]) => {
          this.ingredients = ingredients;
        }
      );

    this.formInit();
  }

  ngOnDestroy() {
    this.ingredientSubscription.unsubscribe();
  }

  // methods

  // initialize the form
  // code is here to shorten ngOnInit

  formInit() {
    this.ingredientArray = new FormArray([]);

    // populate input fields with existing ingredients
    for (const ingredient of this.ingredients) {
      this.ingredientArray.push(
        new FormGroup({
          text: new FormControl(ingredient)
        })
      );
    }

    this.addListItem(); // always have an empty input at the end so user can add more items

    // this formgroup only includes the ingredients array
    this.formGroup = new FormGroup({
      'ingredients': this.ingredientArray
    });
  }

  // automatically adds an empty input at the end for user to add new items
  // I think this is better than having to click a plus button
  autoAddNewItem(index: number) {
    if ( this.isLastElement(index) ) {
      this.addListItem();
    }
  }

  // adds an empty input at the end of the array
  addListItem() {
    this.ingredientArray.push(
      new FormGroup({
        'text': new FormControl('')
      })
    );
  }

  // checks to see if the item with this index is the last in the array
  isLastElement(index: number) {
    return (index === this.ingredientArray.length - 1);
  }

  // creates a bunch of new ingredients so they can be updated in the data service
  updateIngredients() {
    const newIngredients: string[] = [];
    for (const ingredientGroup of (<FormArray>this.formGroup.get('ingredients')).controls) {
      newIngredients.push(ingredientGroup.get('text').value);
    }

    newIngredients.pop(); // pops the last (always empty) input
    this.shoppingService.updateIngredients(newIngredients);
  }

  // deletes a list item when the x is clicked
  onDeleteClicked(index: number) {
    if (!this.isLastElement(index)) {
      this.ingredientArray.removeAt(index);
      this.shoppingService.deleteIngredient(index);
    }
  }
}
