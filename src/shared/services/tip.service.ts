// 导入必要的定义
import { Injectable, ApplicationRef, ComponentFactoryResolver, ComponentFactory, ComponentRef, Injector } from '@angular/core';
import { TipComponent } from '../components/tip/tip.component';

/**
 * 消息提示服务
 */
@Injectable()
export class TipService {
  private tipComponentFactory: ComponentFactory<TipComponent>; // 消息提示组件工厂

  /**
   * 构造消息提示服务
   * @param appRef 注入应用程序实例
   * @param componentFactoryResolver 注入组件工厂解析器
   * @param injector 注入依赖注入器
   */
  constructor(private appRef: ApplicationRef, private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector) {
    // 创建消息提示组件的组件工厂
    this.tipComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TipComponent);
  }

  tip(message: string): void {
    // 创建消息提示组件（引用）
    const tipComponentRef: ComponentRef<TipComponent> = this.tipComponentFactory.create(this.injector);

    // 附加消息提示视图到应用程序中
    this.appRef.attachView(tipComponentRef.hostView);

    // 附加与消息提示视图相应的DOM元素到HTML body元素中
    const domElement = tipComponentRef.location.nativeElement;
    document.body.appendChild(domElement);

    // 获取消息提示组件，并设置消息提示组件的message属性
    const tipComponent: TipComponent = tipComponentRef.instance;
    tipComponent.message = message;

    // 销毁并移除消息提示组和视图
    setTimeout(() => {
      this.appRef.detachView(tipComponentRef.hostView);
      tipComponentRef.destroy();
      domElement.remove();
    }, 1500);
  }
}
