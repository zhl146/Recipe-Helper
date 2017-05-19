import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeBookComponent } from "./recipebook/recipebook.component";
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { RecipeListComponent } from './recipebook/recipe-list/recipe-list.component';
import { ShoppingEditComponent } from './shoppinglist/shopping-edit/shopping-edit.component';
import { RecipeDetailComponent } from './recipebook/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipebook/recipe-item/recipe-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeBookComponent,
    ShoppinglistComponent,
    RecipeListComponent,
    ShoppingEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
