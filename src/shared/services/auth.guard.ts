import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GenericServiceResult } from '../../tools/service-result';

@Injectable()
export class AuthGuard implements CanLoad {
  customerName: string; // 在客户端保存登录用户的姓名

  /**
   * 构造路由守卫服务
   * @param httpClient 注入HttpClient
   * @param router 注入router
   */
  constructor(private httpClient: HttpClient, private router: Router) {
  }

  /**
   * 路由模块加载守卫方法：当返回true或可被订阅到true的可观察对象时，目标路由模块会被加载；反之则不会
   */
  canLoad(): boolean | Observable<boolean> {
    // 如果客户端保存的登录客户姓名不为空，那么直接返回true
    if (this.customerName) {
      return true;
    }

    // 从服务端获取已登录客户的姓名
    const responseObservable: Observable<GenericServiceResult<string>>
      = this.httpClient.get<GenericServiceResult<string>>('api/customer/name');

    // 将类型为Observable<GenericServiceResult<string>>的可观察对象responseObservable，
    // 映射成类型为Observable<boolean>的可观察对象successObservable
    const successObservable: Observable<boolean> = responseObservable.pipe(map(x => {
      // 如果服务端返回的结果说明客户是已登录的，那么将服务端返回的客户姓名保存到客户端
      if (x.success) {
        this.customerName = x.data;
      } else {
        // 如果服务端返回的结果说明客户未登录，那么清楚客户端保存的客户姓名，
        // 并将请求导航到客户登录组件（视图）
        this.customerName = '';
        this.router.navigate(['/customer/log-in']);
        return false;
      }
      return x.success;
    }));

    // 返回类型为Observable<boolean>的可观察对象successObservable
    return successObservable;
  }
}
