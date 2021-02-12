import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericServiceResult } from '../../tools/service-result';
import { CartWare } from './carts.model';

@Injectable()
export class CartsService {
  constructor(private httpClient: HttpClient) {
  }

  getWareList(): Observable<GenericServiceResult<Array<CartWare>>> {
    return this.httpClient.get<GenericServiceResult<Array<CartWare>>>('/api/cart/list');
  }

  removeWare(id: number): Observable<GenericServiceResult<number>> {
    return this.httpClient.post<GenericServiceResult<number>>('/api/cart/remove', { id });
  }

  updateWareCount(wareId: number, count: number): Observable<GenericServiceResult<number>>{
    return this.httpClient.post<GenericServiceResult<number>>('/api/cart/update', { wareId, count });
  }
}
