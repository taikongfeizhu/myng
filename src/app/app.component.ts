import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { CartTotalService } from '../shared/services/cat-total.service';
import { CustomerNameService } from '../shared/services/customer-name.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'myng';
  petCount = 0;
  cartTotal = 0;
  customerName: string;
  pets: Array<Pets>;

  constructor(private cartTotalService: CartTotalService, private customerNameService: CustomerNameService) {
    const petService: AppService = new AppService();
    this.petCount = petService.getPetCount();
    this.pets = petService.getPets();

    this.cartTotalService.cartTotalSubject.subscribe(x => {
      // 保存购物车商品总数（参数x）到组件属性cartTotal，以便用于插值绑定
      this.cartTotal = x;
    });

    this.customerNameService.subscribeCustomerName((x) => {
      this.customerName = x;
    });
  }

  ngOnInit(): void {
    this.customerNameService.updateCustomerName();
    this.cartTotalService.updateCartTotal();
  }
}
