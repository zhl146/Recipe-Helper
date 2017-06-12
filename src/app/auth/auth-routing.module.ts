import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const authRoutes: Routes = [
  {
    path: 'auth', component: AuthComponent,
    children: [
      {path: 'reset', component: PasswordResetComponent},
      {path: 'request', component: RequestPasswordComponent},
      {path: 'signin', component: SignInComponent},
      {path: 'signup', component: SignUpComponent},
      {path: '', redirectTo: 'signup', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'auth'}
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}
