import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ]
})
export class AuthModule {}
