import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('unitInput') unitInputRef: ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @Output() ingredientCleared = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onAddIngredientClick() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const ingUnit = this.unitInputRef.nativeElement.value;
    console.log(ingName);
    const newIngredient = new Ingredient(ingName, ingAmount, ingUnit);
    console.log(newIngredient);
    this.ingredientAdded.emit(newIngredient);
  }

  onClearIngredientClick() {
    this.ingredientCleared.emit();
  }

}
