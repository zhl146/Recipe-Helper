import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { ShoppinglistService } from '../shared/shoppinglist.service';
import { OptionsService } from '../shared/options.service';
import { ShoppingListItem } from './shopping-list-item.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { style, trigger, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class ShoppinglistComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  private optionsSub: Subscription;

  shoppingInfo: boolean;

  ingForm: FormGroup;

  constructor( private shoppingService: ShoppinglistService,
               private fb: FormBuilder,
               private optionsService: OptionsService ) {
  }

  // LIFECYCLE

  ngOnInit() {
    this.createForm();
    this.initFormData();

    this.optionsSub = this.optionsService.getOptionsObs()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (options) => {
          this.shoppingInfo = options.shoppingInfo;
        }
      );
  }

  // clean up to prevent memory leak
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // METHODS

  // created the empty form
  createForm() {
    const shoppingListItemArray = this.fb.array([]);
    this.ingForm = this.fb.group({
      shoppingListItems: shoppingListItemArray
    });
  }

  initFormData() {
    // we only initialize the forms the first time the component is created
    // otherwise, we will have to blow up the entire form every time the data changes
    // populate input fields with existing ingredients
    const itemFormGroups = this.shoppingService.getLocalList().map( item => this.fb.group(item));
    const itemFormArray = this.fb.array(itemFormGroups);
    this.ingForm.setControl('shoppingListItems', itemFormArray);
    // always have an empty input at the end so user can add more items
    this.addListItem();
  }

  // in the current version of angular, the get function needs to be wrapped
  // or it will error when AOT compiled
  getListItemControls() {
    return (<FormArray>this.ingForm.get('shoppingListItems')).controls;
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
    (<FormArray>this.ingForm.get('shoppingListItems')).controls.push(
      this.fb.group({
        text: '',
        checked: false
      })
    );
  }

  // checks to see if the item with this index is the last in the array
  isLastElement(index: number) {
    return (index === (<FormArray>this.ingForm.get('shoppingListItems')).length - 1);
  }

  // converts control values into a string array
  // updates ingredients data service with a the array
  updateIngredients() {
    const newIngredients: ShoppingListItem[] = [];
    for (const ingredientGroup of (<FormArray>this.ingForm.get('shoppingListItems')).controls) {
      const itemText: string = ingredientGroup.get('text').value;
      const itemChecked: boolean = ingredientGroup.get('checked').value;
      const newIngredient: ShoppingListItem = new ShoppingListItem(itemChecked, itemText);
      newIngredients.push(newIngredient);
    }
    this.shoppingService.updateLocalList(newIngredients);
  }

  updateIngredient(index: number) {
    // pretty convoluted to get the value on the text in input array
    const itemText: string = (<FormArray>this.ingForm.get('shoppingListItems')).controls[index].get('text').value;
    const itemChecked: boolean = (<FormArray>this.ingForm.get('shoppingListItems')).controls[index].get('checked').value;
    const updatedIngredient: ShoppingListItem = new ShoppingListItem(itemChecked, itemText);
    this.shoppingService.updateListItem(updatedIngredient, index);
  }

  // deletes a list item when the x is clicked
  onDeleteClicked(index: number) {
    if (!this.isLastElement(index)) {
      (<FormArray>this.ingForm.get('shoppingListItems')).removeAt(index);
      this.shoppingService.deleteListItem(index);
    }
  }

  onClear() {
    Observable.timer(0, 100)
      .take((<FormArray>this.ingForm.get('shoppingListItems')).length - 1)
      .subscribe(
        () => {
          // we have -2 here so that we never remove the last empty input
          const lastElement = (<FormArray>this.ingForm.get('shoppingListItems')).length - 2;
          (<FormArray>this.ingForm.get('shoppingListItems')).removeAt(lastElement);
        }
      );
    this.shoppingService.updateLocalList([]);
  }

  onGotIt() {
    this.optionsService.disableShoppingInfo();
  }
}
