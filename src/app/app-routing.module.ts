import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { AuthGuard } from './auth/auth-guard.service';


const appRoutes: Routes = [
  { path: 'login', component: AuthComponent},
  { path: 'shopping', component: ShoppinglistComponent, canActivate: [AuthGuard] }
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
