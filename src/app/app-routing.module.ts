import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { LoaderComponent } from './core/loader/loader.component';

import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: 'shopping', component: ShoppinglistComponent, canActivate: [AuthGuard] },
  { path: 'loading', component: LoaderComponent },
  { path: '', redirectTo: '/auth/signup', pathMatch: 'full'},
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
