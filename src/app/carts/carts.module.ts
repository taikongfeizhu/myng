import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsComponent } from './carts.component';
import { CartsService } from './carts.service';

@NgModule({
  declarations: [CartsComponent],
  providers: [CartsService],
  imports: [
    CommonModule
  ]
})
export class CartsModule { }
