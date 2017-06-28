import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdButtonModule,
  MdCheckboxModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdSnackBarModule,
  MdTabsModule
} from '@angular/material';

import { ImageFallbackDirective } from './image-fallback.directive';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    ImageFallbackDirective,
    ErrorDialogComponent
  ],
  imports: [

    // material design
    MdButtonModule,
    MdInputModule,
    MdListModule,
    MdIconModule,
    MdCheckboxModule,
    MdTabsModule,
    MdSnackBarModule,
    MdDialogModule
  ],
  exports: [
    // required
    CommonModule,

    // material design
    MdButtonModule,
    MdInputModule,
    MdListModule,
    MdIconModule,
    MdCheckboxModule,
    MdTabsModule,
    MdSnackBarModule,
    MdDialogModule,

    // directives
    ImageFallbackDirective
  ]
})
export class SharedModule {}
