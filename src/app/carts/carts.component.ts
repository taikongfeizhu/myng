import { Component, OnInit } from '@angular/core';
import { CartWare } from './carts.model';
import { CartsService } from './carts.service';
import { CartTotalService } from '../../shared/services/cat-total.service';
import { TipService } from '../../shared/services/tip.service';
import { ConfirmService } from '../../shared/services/confirm.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.less']
})
export class CartsComponent implements OnInit {

  cartWares: Array<CartWare>; // 购物车商品列表

  /**
   * 构造方法
   * @param cartService 注入购物车服务
   */
  constructor(
    private cartService: CartsService,
    private cartTotalService: CartTotalService,
    private tipService: TipService,
    private confirmService: ConfirmService,
  ) {
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
        this.tipService.tip(x.message);
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

    this.confirmService.confirm({title: '删除', body: '确认要删除当前商品吗？'}).subscribe(result => {
      if (!result){
        return;
      }

      this.cartService.removeWare(id).subscribe(resp => {
        // 如果服务端返回成功结果，那么将相应的购物车商品从属性cartWares中删除
        if (resp.success === true) {
          this.cartTotalService.cartTotalSubject.next(resp.data);
          const removedWareIndex = this.cartWares.findIndex(y => y.id === id);
          this.cartWares.splice(removedWareIndex, 1);
          this.tipService.tip(resp.message);
        }
      });
    });
  }

  /**
   * 更新指定购物车商品的数量
   * @param ware 购物车商品
   * @param count 目标数量
   * @param event DOM事件对象
   */
  updateWareCount(ware: CartWare, num: any, event?: Event): void {
    const value = typeof num === 'number' ? num : num.value;
    const count = Number.parseInt(value, 10); // 将目标数量的类型转换为数字
    if (isNaN(count) || count < 1) {
      // 如果未提供目标数量或提供的目标数量的值小于1，那么阻止客户更新购物车商品数量
      this.tipService.tip('非法的数量');

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
        this.cartTotalService.cartTotalSubject.next(x.data);
      } else if (event) {
        // 恢复购物车商品原来的数量
        (event.target as HTMLInputElement).value = ware.count.toString();
      }
      this.tipService.tip(x.message);
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
}
