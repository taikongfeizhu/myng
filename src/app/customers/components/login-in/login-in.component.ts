import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../customers.service';
import { Customer } from '../../customers.model';
import { CustomerNameService } from '../../../../shared/services/customer-name.service';
import { CartTotalService } from '../../../../shared/services/cat-total.service';

@Component({
  selector: 'app-login-in',
  templateUrl: './login-in.component.html',
  styleUrls: ['./login-in.component.less']
})
export class LoginInComponent implements OnInit {
  public customer: Customer; // 定义客户实体属性
  public shouldPersist: boolean; // 是否需要记住客户的登录状态

  /**
   * 构造客户登录组件
   * @param customerService 客户服务
   * @param route 活动路由
   * @param router 路由器
   */
  constructor(
    private customerService: CustomerService,
    private cartTotalService: CartTotalService,
    private route: ActivatedRoute,
    private router: Router,
    private customerNameService: CustomerNameService
  ) {
    // 初始化视图模型customer，这一步不能少
    this.customer = new Customer();

    // 如果用户注册成功后被导航到当前组件，那么尝试从活动路由中获取路由参数phone的值
    this.customer.phone = this.route.snapshot.params.phone;
  }

  /**
   * 客户登录应用逻辑
   */
  logIn(): void {
    console.log('LogInComponent.logIn()方法被执行'); // 向控制台输出调试信息
    this.customerService.checkCustomer(this.customer, this.shouldPersist).subscribe(x => {
      if (x.success){
        console.log('登录成功');
        this.router.navigate(['/']);
        this.customerNameService.updateCustomerName();
        this.cartTotalService.updateCartTotal();
      } else {
        console.error(x.message);
      }
    });
  }

  testModel(model: unknown): void{
    console.log(model);
  }

  ngOnInit(): void {
  }

}
