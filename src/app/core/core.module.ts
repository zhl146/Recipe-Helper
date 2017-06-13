import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { OptionsDialogComponent } from './options-dialog/options-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    OptionsDialogComponent
  ],
  entryComponents: [
    OptionsDialogComponent
    ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ]
})
export class CoreModule { }
