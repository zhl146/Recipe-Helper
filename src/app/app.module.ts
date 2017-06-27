import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AuthModule } from './auth/auth.module';
import { RecipeBookModule } from './recipebook/recipebook.module';
import { ShoppingListModule } from './shoppinglist/shoppinglist.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

import { ShoppinglistService } from './shared/shoppinglist.service';
import { AppHttpService } from 'app/shared/http.service';
import { RecipeBookDataService } from 'app/shared/recipe-book-data.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { UserService } from './shared/user.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    CoreModule,
    RecipeBookModule,
    ShoppingListModule,
    AuthModule,
    SharedModule
  ],
  providers: [
    ShoppinglistService,
    RecipeBookDataService,
    AppHttpService,
    AuthService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
