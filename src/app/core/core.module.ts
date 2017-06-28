import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { SignOutDialogComponent } from './sign-out-dialog/sign-out-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    HeaderComponent,
    SignOutDialogComponent
  ],
  entryComponents: [
    SignOutDialogComponent
    ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ]
})
export class CoreModule { }
