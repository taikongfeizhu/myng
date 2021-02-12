import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { WareModule } from './ware/ware.module';
import { CartsModule } from './carts/carts.module';
// import { CustomersModule } from './customers/customers.module';
import { HttpClientModule } from '@angular/common/http';
import { WareDetailModule } from './ware-detail/ware-detail.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    WareModule,
    CartsModule,
    WareDetailModule,
    HttpClientModule,
    // CustomersModule,
    AppRoutingModule
  ],
  providers: [
    AppService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
