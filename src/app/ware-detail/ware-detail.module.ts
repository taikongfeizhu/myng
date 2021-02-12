import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WareDetailComponent } from './ware-detail.component';
import { WareDetailService } from './ware-detail.service';
import { FormsModule } from '@angular/forms';
import { WareDetailRoutingModule } from './ware-detail-routing.module';

@NgModule({
  declarations: [WareDetailComponent],
  exports: [
    WareDetailComponent
  ],
  providers: [
    {
      provide: WareDetailService,
      useClass: WareDetailService,
    }
  ],
  imports: [
    CommonModule,
    FormsModule,
    WareDetailRoutingModule,
  ]
})
export class WareDetailModule { }
