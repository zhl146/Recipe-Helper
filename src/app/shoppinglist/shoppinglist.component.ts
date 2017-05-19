import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {

  // dummy ingredient array
  // will remove it later and probably move this functionality to a service
  // service will most likely http call to a server for ingredient lists

  ingredients: Ingredient[] = [
    new Ingredient('mole', 76876, 'mole'),
    new Ingredient('derp', 123234, 'things')
  ];

  constructor() { }

  ngOnInit() {
  }

  // adds an ingredient object to the ingredients array
  // results in a new ingredient being displayed to the user
  // method should be called when an event is fired from the shopping-edit component

  addIngredient(newIngredient: Ingredient){
    this.ingredients.push(newIngredient)
  }

  clearIngredient(){
  }


  // takes an index of the ingredients array and deletes it
  // results in that ingredient being removed from the user view
  // method should be called when an event is fired from the shopping-edit component

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

}
