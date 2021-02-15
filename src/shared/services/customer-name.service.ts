import { Injectable } from '@angular/core'; // 导入可注入装饰器类
import { HttpClient } from '@angular/common/http'; // 导入HttpClient
import { Subject, Subscription } from 'rxjs'; // 导入目标对象类Subject
import { GenericServiceResult } from '../../tools/service-result'; // 导入服务结果类

/**
 * 定义客户姓名服务
 */
@Injectable() // 将客户姓名服务装饰为可被注入的
export class CustomerNameService {
  /**
   * 构造客户姓名服务
   * @param httpClient 注入HttpClient实例
   */
  constructor(private httpClient: HttpClient) {
  }

  // 登录客户姓名Subject
  private customerNameSubject: Subject<string> = new Subject<string>();

  /**
   * 注册接收登录客户姓名的通知方法
   * @param next 观察者通知函数
   */
  subscribeCustomerName(next: (x: string) => void): Subscription {
    return this.customerNameSubject.subscribe(next);
  }

  /**
   * 更新登录客户姓名
   */
  updateCustomerName(): void {
    // 从服务端获取已登录客户的姓名
    this.httpClient.get<GenericServiceResult<string>>('/api/customer/name').subscribe(x => {
      // 如果获取成功，那么通过Subject将客户姓名通知给所有的观察者
      if (x.success === true) {
        this.customerNameSubject.next(x.data);
      }
    });
  }
}
