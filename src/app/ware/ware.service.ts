import { Injectable } from '@angular/core';
import { Ware } from './ware.model';  // 导入商品实体类型的定义
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericServiceResult } from '../../tools/service-result';

/**
 * 商品服务
 */

@Injectable()
export class WareService {
  constructor(private httpClient: HttpClient) {
  }

  /**
   * 获取商品列表
   */
  getWareList(): Observable<GenericServiceResult<Array<Ware>>> {
    return this.httpClient.get<GenericServiceResult<Array<Ware>>>('/api/ware/list');
  }

  /**
   * 获取指定ID的商品
   * @param wareId 目标商品ID
   */
  getWare(wareId: number): Observable<GenericServiceResult<Array<Ware>>> {
    return this.httpClient.get<GenericServiceResult<Array<Ware>>>('/api/ware/detail', { params: { wareId: wareId.toString() } });
  }
}
