import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule, MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdSidenavModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageFallbackDirective } from './image-fallback.directive';

@NgModule({
  declarations: [
    ImageFallbackDirective
  ],
  imports: [
    // layout grid
    FlexLayoutModule,

    // material design
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
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

    // layout grid
    FlexLayoutModule,

    // material design
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
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
