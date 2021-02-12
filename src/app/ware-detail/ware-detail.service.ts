import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ware } from './ware.model';
import { GenericServiceResult } from '../../tools/service-result';

/**
 * 商品服务
 */

@Injectable()
export class WareDetailService {
  constructor(private httpClient: HttpClient) {
  }

  /**
   * 获取指定ID的商品
   * @param wareId 目标商品ID
   */
  getWare(wareId: number): Observable<GenericServiceResult<Ware>> {
    return this.httpClient.get<GenericServiceResult<Ware>>('/api/ware/detail', { params: { wareId: wareId.toString() } });
  }

  addToCart(wareId: number, count: number): Observable<GenericServiceResult<number>> {
    return this.httpClient.post<GenericServiceResult<number>>('/api/cart/add', {
      wareId,
      count,
    });
  }
}
