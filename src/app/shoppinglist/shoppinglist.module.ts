import { NgModule } from '@angular/core';
import { ShoppinglistComponent } from './shoppinglist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ShoppinglistComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ShoppingListModule {}
