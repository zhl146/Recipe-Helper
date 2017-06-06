import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { ShoppinglistService } from '../shoppinglist/shoppinglist.service';
import { RecipebookService } from '../recipebook/recipebook.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth-guard.service';
import { AppHttpService } from '../shared/http.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    ShoppinglistService,
    RecipebookService,
    AppHttpService,
    AuthService,
    AuthGuard
  ]
})
export class CoreModule { }
