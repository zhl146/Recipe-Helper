import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RecipeBookRoutingModule } from './recipebook-routing.module';

import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeBookComponent } from './recipebook.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';

import { TimePipe } from './time.pipe';
import { RecipeFilterPipe } from './recipe-list/recipe-filter.pipe';
import { FabDropdownComponent } from './recipe-list/fab-dropdown.component';

@NgModule({
  declarations: [
    RecipeEditComponent,
    RecipeBookComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeStartComponent,
    TimePipe,
    RecipeFilterPipe,
    FabDropdownComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipeBookRoutingModule,
    SharedModule
  ]
})
export class RecipeBookModule {}
