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
import { RecipebookService } from 'app/shared/recipebook.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { OptionsService } from './shared/options.service';
import { FirebaseWrapperService } from './shared/firebase-wrapper.service';

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
    RecipebookService,
    AppHttpService,
    AuthService,
    OptionsService,
    AuthGuard,
    FirebaseWrapperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
