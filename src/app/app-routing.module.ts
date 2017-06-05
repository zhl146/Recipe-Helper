import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { RecipeBookComponent } from './recipebook/recipebook.component';
import { RecipeDetailComponent } from './recipebook/recipe-detail/recipe-detail.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { RecipeStartComponent } from 'app/recipebook/recipe-start/recipe-start.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RecipeEditComponent } from './recipebook/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth-guard.service';


const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: AuthComponent},
  { path: 'recipes', component: RecipeBookComponent, canActivate: [AuthGuard],
    children: [
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
      { path: '', component: RecipeStartComponent, pathMatch: 'full'}
    ]
  },
  { path: 'shopping', component: ShoppinglistComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
