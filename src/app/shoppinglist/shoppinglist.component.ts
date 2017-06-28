import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { ShoppinglistService } from '../shared/shoppinglist.service';
import { ShoppingListItem } from './shopping-list-item.model';
import { Subject } from 'rxjs/Subject';

import { growInOut } from '../shared/animations';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss'],
  animations: [
    growInOut,
  ]
})
export class ShoppinglistComponent implements OnInit, OnDestroy {

  // using this so we can focus the proper input when the + is clicked
  @ViewChildren('listItems') listItems: QueryList<any>;

  private ngUnsubscribe: Subject<any> = new Subject();

  // the form
  ingForm: FormGroup;

  // some feedback to prevent the user from accidentally clearing their list
  clearState = false;

  constructor( private shoppingService: ShoppinglistService,
               private fb: FormBuilder) {
  }

  // LIFECYCLE

  ngOnInit() {
    this.createForm();
    this.initFormData();
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
    const localList = this.shoppingService.getLocalList().filter(value => value.text !== '');
    const itemFormGroups = localList.map( item => this.fb.group(item));
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

  // displays a new icon to the user for 1.5s to confirm clear
  // so that user will not accidentally clear their list
  onClearIntent() {
    this.clearState = true;
    setTimeout( () => { this.clearState = false; }, 1500);
  }

  // clears the list
  onClear() {
    this.ingForm.setControl('shoppingListItems', this.fb.array([]));
    this.addListItem();
    this.shoppingService.updateLocalList([]);
    this.clearState = false;
  }

  // code is a bit convoluted, but it successfully selects and focuses the last list element
  // there may be a way to do this using the material2 focus method, but I didn't figure out how
  onPlus() {
    this.listItems.last.nativeElement.children[1]
      .firstElementChild.firstElementChild.firstElementChild.firstElementChild.focus();
  }

}
