import { NgModule } from '@angular/core';
import { ShoppinglistComponent } from './shoppinglist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ShoppinglistComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ShoppingListModule {}
