import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { LoginInComponent } from './components/login-in/login-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerService } from './customers.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomersComponent, LoginInComponent, SignUpComponent],
  providers: [CustomerService],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule
  ]
})
export class CustomersModule {
}
