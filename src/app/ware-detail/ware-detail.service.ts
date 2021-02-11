import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ware } from '../ware/ware.model';
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
  getWare(wareId: number): Observable<GenericServiceResult<Array<Ware>>> {
    return this.httpClient.get<GenericServiceResult<Array<Ware>>>('/api/ware/detail', { params: { wareId: wareId.toString() } });
  }
}
