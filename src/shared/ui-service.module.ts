import { NgModule } from '@angular/core';                  // 导入模块装饰器
import { CommonModule } from '@angular/common';            // 导入通用模块
import { TipService } from './services/tip.service';       // 导入消息提示服务
import { TipComponent } from './components/tip/tip.component';
import { ConfirmService } from './services/confirm.service';
import { ConfirmComponent } from './components/confirm/confirm.component';

/**
 * UI服务模块
 */
@NgModule({
  imports: [CommonModule],        // 导入通用模块
  providers: [TipService, ConfirmService],        // 注册消息提示服务
  declarations: [TipComponent, ConfirmComponent],   // 声明消息提示组件
  entryComponents: [TipComponent, ConfirmComponent] // 设消息提示组件为置入口组件
})
export class UiServiceModule {
}
