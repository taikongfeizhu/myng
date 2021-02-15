import { Injectable, ApplicationRef, ComponentFactoryResolver, ComponentFactory, ComponentRef, Injector } from '@angular/core'; // 导入必要的定义
import { Observable, Subscriber } from 'rxjs'; // 导入可观察对象类和订阅者/观察者类
import { ConfirmComponent } from '../components/confirm/confirm.component'; // 导入确认提示组件

/**
 * 确认提示服务
 */
@Injectable()
export class ConfirmService {
  private confirmComponentFactory: ComponentFactory<ConfirmComponent>; // 确认提示组件工厂

  /**
   * 构造确认提示服务
   * @param appRef 注入应用程序实例
   * @param componentFactoryResolver 注入组件工厂解析器
   * @param injector 注入依赖注入器
   */
  constructor(private appRef: ApplicationRef, private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector) {
    // 创建确认提示组件的组件工厂
    this.confirmComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmComponent);
  }

  confirm(message: {title: string, body: string}): Observable<boolean> {
    // 创建确认提示组件（引用）
    const confirmComponentRef: ComponentRef<ConfirmComponent> = this.confirmComponentFactory.create(this.injector);

    // 附加确认提示视图到应用程序中
    this.appRef.attachView(confirmComponentRef.hostView);

    // 附加与确认提示视图相应的DOM元素到HTML body元素中
    const domElement = confirmComponentRef.location.nativeElement;
    document.body.appendChild(domElement);

    // 获取确认提示组件，并设置确认提示组件的message属性
    const confirmComponent: ConfirmComponent = confirmComponentRef.instance;
    confirmComponent.message = message;

    // 创建接收用户选择结果的可观察对象，并在其被注册观察者（订阅者）时，保存这个观察者的引用
    let subscriber: Subscriber<boolean>;
    const confirmObservable: Observable<boolean> = new Observable((x) => {
      subscriber = x; // 这行代码会在confirmObservable的subscribe()方法被调用时被执行
    });

    // 设置消息提示组件的“确认”或“取消”按钮被点击时需要调用的函数
    confirmComponent.onChoose = (yesOrNo: boolean) => {
      // 销毁并移除确认提示组和视图
      this.appRef.detachView(confirmComponentRef.hostView);
      confirmComponentRef.destroy();
      domElement.remove();

      // 通知观察者用户点击的是“确认”按钮还是“取消”按钮
      if (subscriber) {
        subscriber.next(yesOrNo);
      }
    };

    // 返回接收用户选择结果的可观察对象，以使调用方注册观察这个结果的观察者
    return confirmObservable;
  }
}
