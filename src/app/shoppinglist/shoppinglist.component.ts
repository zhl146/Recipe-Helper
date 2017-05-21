import { Component, OnDestroy, OnInit } from '@angular/core';
import {ShoppinglistService} from './shoppinglist.service';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor( private shoppingService: ShoppinglistService ) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.subscription = this.shoppingService.ingredientsSubject
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onDeleteClicked(index: number){
    this.shoppingService.deleteIngredient(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
