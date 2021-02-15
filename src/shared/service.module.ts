import { NgModule } from '@angular/core';
import { CartTotalService } from './services/cat-total.service';
import { CustomerNameService } from './services/customer-name.service';
import { AuthGuard } from './services/auth.guard';
import { TipService } from './services/tip.service';

@NgModule({
  providers: [CartTotalService, CustomerNameService, AuthGuard, TipService]
})
export class ServiceModule { }
