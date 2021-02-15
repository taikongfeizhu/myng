import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartsComponent } from './carts.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CartsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    FormsModule,
    RouterModule
  ],
})
export class CartsRoutingModule {
}
