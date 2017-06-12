import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CoreComponent } from './core.component';
import { AppRoutingModule } from '../app-routing.module';
import { OptionsDialogComponent } from './options-dialog/options-dialog.component';
import { FormsModule } from '@angular/forms';

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
    CoreComponent,
    OptionsDialogComponent
  ],
  entryComponents: [
    OptionsDialogComponent
    ],
  exports: [
    AppRoutingModule,
    CoreComponent
  ]
})
export class CoreModule { }
