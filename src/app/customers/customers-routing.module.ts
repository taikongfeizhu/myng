import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginInComponent } from './components/login-in/login-in.component';

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'log-in',
    component: LoginInComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class CustomersRoutingModule {
}
