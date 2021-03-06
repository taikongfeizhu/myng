import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from '../widgets/widgets.module';
import { WareComponent } from './ware.component';
import { WareRoutingModule } from './ware-routing.module';
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
    WidgetsModule,
    WareRoutingModule,
  ]
})
export class WareModule { }
