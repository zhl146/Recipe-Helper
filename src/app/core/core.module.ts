import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CoreComponent } from './core.component';
import { AppRoutingModule } from '../app-routing.module';
import { SignoutDialogComponent } from './signout-dialog/signout-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    CoreComponent,
    SignoutDialogComponent
  ],
  entryComponents: [
    SignoutDialogComponent
    ],
  exports: [
    AppRoutingModule,
    CoreComponent
  ]
})
export class CoreModule { }
