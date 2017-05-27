import { Component, OnInit } from '@angular/core';
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
      ingredientText: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.shoppingService.addIngredient(this.ingredientForm.get('ingredientText').value);
  }

}
