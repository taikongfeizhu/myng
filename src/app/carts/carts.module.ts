import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartsComponent } from './carts.component';
import { CartsService } from './carts.service';
import { WidgetsModule } from '../widgets/widgets.module';
import { CartsRoutingModule } from './carts-routing.module';

@NgModule({
  declarations: [CartsComponent],
  providers: [CartsService],
  imports: [
    CommonModule,
    FormsModule,
    WidgetsModule,
    CartsRoutingModule
  ]
})
export class CartsModule { }
