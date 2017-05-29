import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppinglistService } from './shoppinglist/shoppinglist.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeBookComponent } from './recipebook/recipebook.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { RecipeListComponent } from './recipebook/recipe-list/recipe-list.component';
import { ShoppingEditComponent } from './Deprecated/shopping-edit/shopping-edit.component';
import { RecipeDetailComponent } from './recipebook/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipebook/recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipebook/recipe-edit/recipe-edit.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RecipeStartComponent } from './recipebook/recipe-start/recipe-start.component';
import { RecipebookService } from './recipebook/recipebook.service';
import { AppHttpService } from './shared/http.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeBookComponent,
    ShoppinglistComponent,
    RecipeListComponent,
    ShoppingEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    DropdownDirective,
    RecipeEditComponent,
    HomePageComponent,
    RecipeStartComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    ShoppinglistService,
    RecipebookService,
    AppHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
