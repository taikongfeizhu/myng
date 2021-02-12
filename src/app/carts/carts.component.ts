import { Component, OnInit } from '@angular/core';
import { CartWare } from './carts.model';
import { CartsService } from './carts.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.less']
})
export class CartsComponent implements OnInit {

  cartWares: Array<CartWare>; // 购物车商品列表
  message: string; // 购物车操作提示

  /**
   * 构造方法
   * @param cartService 注入购物车服务
   */
  constructor(private cartService: CartsService) {
    this.cartWares = new Array<CartWare>();
  }

  /**
   * 初始化挂钩方法，获取购物车商品列表
   */
  ngOnInit(): void {
    this.getWareList();
  }

  /**
   * 获取购物车商品列表
   */
  getWareList(): void {
    // 调用购物车服务的getWareList()方法，以获取购物车商品数组
    this.cartService.getWareList().subscribe(x => {
      // 如果Web API返回失败结果，那么显示失败描述
      if (!x.success) {
        this.message = x.message;
        this.clearMessage();
        return;
      }

      // Web API返回成功结果，保存返回的商品数组到属性cartWares
      this.cartWares = x.data;
    });
  }

  /**
   * 删除指定ID的购物车商品
   * @param id 购物车商品ID
   */
  removeWare(id: number): void {
    // 调用购物车服务的removeWare()方法，以从购物车中删除指定ID的购物车商品
    this.cartService.removeWare(id).subscribe(x => {
      // 如果服务端返回成功结果，那么将相应的购物车商品从属性cartWares中删除
      if (x.success === true) {
        const removedWareIndex = this.cartWares.findIndex(y => y.id === id);
        this.cartWares.splice(removedWareIndex, 1);
      }

      // 显示删除成功或失败的提示
      this.message = x.message;
      this.clearMessage();
    });
  }

  /**
   * 更新指定购物车商品的数量
   * @param ware 购物车商品
   * @param count 目标数量
   * @param event DOM事件对象
   */
  updateWareCount(ware: CartWare, count: any, event?: Event): void {
    count = Number.parseInt(count, 10); // 将目标数量的类型转换为数字

    if (isNaN(count) || count < 1) {
      // 如果未提供目标数量或提供的目标数量的值小于1，那么阻止客户更新购物车商品数量
      this.message = '非法的数量';
      this.clearMessage();

      // 恢复购物车商品原来的数量
      if (event) {
        (event.target as HTMLInputElement).value = ware.count.toString();
      }
      // let _count = ware.count;
      // ware.count = 0;
      // setTimeout(() => {
      //     ware.count = _count;
      // });

      return;
    }

    // 通过购物车服务更新指定商品的数量，然后订阅购物车服务返回的可观察对象
    this.cartService.updateWareCount(ware.wareId, count).subscribe(x => {
      // 如果服务端返回的JSON数据的success节点的值是true，那么更新视图模型中的对应商品的数量
      if (x.success === true) {
        ware.count = count;
      }
      else if (event) {
        // 恢复购物车商品原来的数量
        (event.target as HTMLInputElement).value = ware.count.toString();
      }

      // 显示更新成功或失败提示
      this.message = x.message;
      this.clearMessage();

      return;
    });
  }

  /**
   * 增加指定购物车商品的数量
   * @param ware 购物车商品
   */
  increaseWareCount(ware: CartWare): void {
    this.updateWareCount(ware, ware.count + 1);
  }

  /**
   * 减少指定购物车商品的数量
   * @param ware 购物车商品
   */
  decreaseWareCount(ware: CartWare): void {
    if (ware.count < 2) {
      return;
    }

    this.updateWareCount(ware, ware.count - 1);
  }

  /**
   * 处理商品搜索事件，并统计搜索信息
   * @param wareName 商品搜索关键字
   */
  logSearch(wareName: string): void {
    // 记录搜索关键字
    console.log(`搜索关键字：${wareName}`);

    // 记录客在进行搜索时购物车中的商品
    const waresInCart: string = this.cartWares.map(x => x.wareName).join(',');
    console.log(`购物车中的商品：${waresInCart}`);
  }

  /**
   * 清除购物车操作提示
   */
  private clearMessage(): void {
    // 在1.5秒后清除提示
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      this.message = '';
    }, 1500);
  }
}
