import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { RecipeBookComponent } from './recipebook/recipebook.component';
import { RecipeDetailComponent } from './recipebook/recipe-detail/recipe-detail.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';


const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'recipes', component: RecipeBookComponent,
    children: [
      { path: ':id', component: RecipeDetailComponent }
    ]
  },
  { path: 'shopping', component: ShoppinglistComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home'}
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
