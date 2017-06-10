import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdSidenavModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CollapseAnimationDirective } from './collapse-animation.directive';

@NgModule({
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
    MdSnackBarModule
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
    MdSnackBarModule
  ],
  declarations: [CollapseAnimationDirective]
})
export class SharedModule {}
