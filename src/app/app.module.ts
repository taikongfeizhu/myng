import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {WareModule} from './ware/ware.module';
import {ServiceModule} from '../shared/service.module';
// import { CartsModule } from './carts/carts.module';
// import { CustomersModule } from './customers/customers.module';
import {HttpClientModule} from '@angular/common/http';
import {WareDetailModule} from './ware-detail/ware-detail.module';
import {UserModule} from './users/user.module';
import {AppComponent} from './app.component';
import {AppService} from './app.service';
import {UiServiceModule} from '../shared/ui-service.module';
import {WidgetsModule} from './widgets/widgets.module';

// import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    WareModule,
    ServiceModule,
    WareDetailModule,
    HttpClientModule,
    WidgetsModule,
    UiServiceModule,
    UserModule,
    // CartsModule,
    // CustomersModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: AppService,
      useClass: AppService
    },
    // { provide: APP_BASE_HREF, useValue: '/'  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
