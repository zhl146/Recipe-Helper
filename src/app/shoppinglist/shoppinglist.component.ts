import {Component, OnInit} from '@angular/core';
import {ShoppinglistService} from "./shoppinglist.service";
import {Ingredient} from "../shared/ingredient.model";

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {

  ingredients: Ingredient[];

  constructor( private shoppingService: ShoppinglistService ) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
  }

  onDeleteClicked(index: number){
    this.shoppingService.deleteIngredient(index);
  }

}
