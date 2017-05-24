import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppinglistService } from '../../shoppinglist/shoppinglist.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  ingredientForm: FormGroup;

  constructor( private shoppingService: ShoppinglistService) { }

  ngOnInit() {
    this.ingredientForm = new FormGroup({
      ingredientName: new FormControl('', [Validators.required]),
      ingredientAmount: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$')
      ]),
      ingredientUnit: new FormControl('')
    });
  }

  onClear() {
    this.ingredientForm.patchValue({'ingredientName': ''});
    this.ingredientForm.patchValue({'ingredientAmount': ''});
    this.ingredientForm.patchValue({'ingredientUnit': ''});
  }

  onSubmit() {
    const name = this.ingredientForm.get('ingredientName').value;
    const amount = this.ingredientForm.get('ingredientAmount').value;
    const unit = this.ingredientForm.get('ingredientUnit').value;

    const newIngredient = new Ingredient(name, +amount, unit);

    this.shoppingService.addIngredient(newIngredient);
  }

}
