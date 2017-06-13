import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';

import { ShoppinglistService } from '../shared/shoppinglist.service';
import { OptionsService } from '../shared/options.service';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss'],
  animations: [
    trigger('listAnimation', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),
      transition('* => *', [
        query(':leave', [
          stagger(200, [ animate(300, style({
            transform: 'translateX(100px)',
            opacity: 0
          })) ])
        ], {optional: true}),
        query(':enter', [
          stagger(200, [style({ transform: 'translateX(-100px)' }), animate(300, ) ])
        ], {optional: true})
      ])
    ])
  ]
})
export class ShoppinglistComponent implements OnInit, OnDestroy {

  ingredients: string[];
  private ingredientSubscription: Subscription;
  private optionsSub: Subscription;

  shoppingInfo: boolean;

  ingForm: FormGroup;
  ingredientArray: FormArray;

  constructor( private shoppingService: ShoppinglistService,
               private fb: FormBuilder,
               private optionsService: OptionsService ) { }

  // LIFECYCLE

  ngOnInit() {
    this.createForm();

    this.optionsSub = this.optionsService.getOptionsObs()
      .subscribe(
        (options) => {
          this.shoppingInfo = options.shoppingInfo;
        }
      );

    this.ingredientSubscription = this.shoppingService.getListSubject()
      .subscribe(
        (ingredients: string[] | null) => {
          // by default, we don't update the form
          let init = false;

          // we check if there are ingredients already registered
          // and that there are actual ingredients being passed to us
          if (!this.ingredients) {
            init = true;
          }

          // now update the local array
          this.ingredients = ingredients;

          // we only initialize the forms the first time the component is created
          // otherwise, we will have to blow up the entire form every time the data changes
          // populate input fields with existing ingredients
          if (init) {
            for (const ingredient of this.ingredients) {
              this.ingredientArray.push(
                new FormGroup({
                  text: new FormControl(ingredient)
                })
              );
            }
            // always have an empty input at the end so user can add more items
            this.addListItem();
          }
        }
      );

    // this.shoppingService.getServerList();
  }

  // clean up to prevent memory leak
  ngOnDestroy() {
    // if ( this.auth.getToken() ) {
    //   this.shoppingService.updateServerList();
    // }
    this.ingredientSubscription.unsubscribe();
    this.optionsSub.unsubscribe();
  }

  // METHODS

  // initialize the form
  // code is here to shorten ngOnInit

  createForm() {
    this.ingredientArray = this.fb.array([]);
    this.ingForm = this.fb.group({
      ingredients: this.ingredientArray
    });
  }

  // in the current version of angular, the get function needs to be wrapped
  // or it will error when AOT compiled
  getIngredientControls() {
    return (<FormArray>this.ingForm.get('ingredients')).controls;
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
      this.fb.group({
        text: ''
      })
    );
  }

  // checks to see if the item with this index is the last in the array
  isLastElement(index: number) {
    return (index === this.ingredientArray.length - 1);
  }

  // converts control values into a string array
  // updates ingredients data service with a the array
  updateIngredients() {
    const newIngredients: string[] = [];
    for (const ingredientGroup of (<FormArray>this.ingForm.get('ingredients')).controls) {
      newIngredients.push(ingredientGroup.get('text').value);
    }

    this.shoppingService.updateLocalList(newIngredients);
  }

  updateIngredient(index: number) {
    // pretty convoluted to get the value on the text in input array
    const updatedIngredient: string = (<FormArray>this.ingForm.get('ingredients')).controls[index].get('text').value;
    this.shoppingService.updateListItem(updatedIngredient, index);
  }

  // deletes a list item when the x is clicked
  onDeleteClicked(index: number) {
    if (!this.isLastElement(index)) {
      this.ingredientArray.removeAt(index);
      this.shoppingService.deleteListItem(index);
    }
  }

  onClear() {
    const listSize = this.ingredients.length;
    while (this.ingredientArray.length > 1) {
      this.ingredientArray.removeAt(this.ingredientArray.length - 1);
    }
    this.shoppingService.updateLocalList([]);
  }

  onGotIt() {
    this.optionsService.disableShoppingInfo();
  }
}
