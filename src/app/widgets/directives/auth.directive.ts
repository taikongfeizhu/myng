// 导入指令装饰器Directive和指令/组件销毁挂钩方法接口OnDestroy
import { Directive, HostBinding, OnDestroy } from '@angular/core';
import { CustomerNameService } from '../../../shared/services/customer-name.service';
import { Subscription } from 'rxjs';

/**
 * 登录验证指令
 */
@Directive({
  selector: '[appAuth]',
  // tslint:disable-next-line:no-host-metadata-property
  host: { '[style.display]': 'display' }
})
export class AuthDirective implements OnDestroy {
  customerName: string; // 登录客户的姓名
  customerNameSubscription: Subscription; // 登录客户姓名订阅对象
  // @HostBinding('style.display') disp = 'display';

  /**
   * 构造登录验证指令
   * @param customerNameService 注入客户姓名服务
   */
  constructor(private customerNameService: CustomerNameService) {
    // 订阅登录客户姓名，并保存返回的订阅对象
    this.customerNameSubscription = this.customerNameService.subscribeCustomerName(x => {
      this.customerName = x;
    });
  }

  // 绑定给目标DOM元素的样式style的值，这个会根据是否订阅到登录客户姓名而变化
  get display(): string {
    return this.customerName ? 'inline' : 'none';
  }

  // 指令销毁挂钩方法
  ngOnDestroy(): void {
    // 当指令实例被销毁时，注销当前指令实例注册到客户姓名服务维护的目标对象customerNameSubject中的观察者
    this.customerNameSubscription.unsubscribe();
  }
}
