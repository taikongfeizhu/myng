import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WareDetailComponent } from './ware-detail.component';
import { WareRoutingModule } from '../ware/ware-routing.module';

const routes: Routes = [
  {
    path: 'ware-detail/:id',
    component: WareDetailComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
    WareRoutingModule
  ],
})
export class WareDetailRoutingModule {
}
