import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customers.model';  // 导入客户实体类的定义
import { ServiceResult } from '../../tools/service-result';

/**
 * 客户服务
 */
@Injectable()
export class CustomerService {
  private customers: Array<Customer>; // 定义客户列表

  constructor(private httpClient: HttpClient) {
    this.customers = new Array<Customer>(); // 初始化客户列表
  }

  /**
   * 添加客户
   * @param customer, 要被添加的客户
   */
  public addCustomer(customer: Customer): Observable<ServiceResult> {
    const responseObservable: Observable<ServiceResult> = this.httpClient.post<ServiceResult>('/api/customer/sign-up', customer);
    return responseObservable;
  }

  /**
   * 检查用户提供的客户是否存在
   * @param customer, 用户提供的客户
   */
  public checkCustomer(customer: Customer, shouldPersist: boolean): Observable<ServiceResult> {
    // 获取目标客户
    const responseObservable: Observable<ServiceResult> = this.httpClient.post<ServiceResult>(`/api/customer/log-in?shouldPersist=${shouldPersist}`, customer);
    return responseObservable;
  }
}
