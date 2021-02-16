import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserService, API_URL } from './user.service';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent],
  providers: [ UserService, {
    provide: API_URL,
    useValue: 'Hlelo World'
  }],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
