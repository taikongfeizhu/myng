import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WareComponent } from './ware.component';
import { WareRoutingModule } from './ware-routing.module';
import { FormsModule } from '@angular/forms';
import { WareService } from './ware.service';

@NgModule({
  declarations: [WareComponent],
  exports: [
    WareComponent
  ],
  providers: [
    {
      provide: WareService,
      useClass: WareService
    }
  ],
  imports: [
    CommonModule,
    FormsModule,
    WareRoutingModule,
  ]
})
export class WareModule { }
