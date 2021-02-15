import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericServiceResult } from '../../tools/service-result';

@Injectable()
export class CartTotalService {
  constructor(private httpClient: HttpClient) {
  }

  cartTotalSubject: Subject<number> = new Subject();

  updateCartTotal(): void {
    this.httpClient.get<GenericServiceResult<number>>('/api/cart/total-count').subscribe((x)=>{
      if (!x.success){
        return;
      }
      this.cartTotalSubject.next(x.data);
    });
  }
}
