import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { OptionsDialogComponent } from './options-dialog/options-dialog.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';

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
    OptionsDialogComponent,
    LoaderComponent
  ],
  entryComponents: [
    OptionsDialogComponent
    ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    LoaderComponent
  ]
})
export class CoreModule { }
