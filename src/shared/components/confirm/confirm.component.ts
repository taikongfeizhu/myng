import { Component } from '@angular/core';

/**
 * 确认提示组件
 */
@Component({
  // 不需要selector
  template: `
    <div class="layer">
        <div class="message">
            <div>{{message.title}}</div>
            <div>{{message.body}}</div>
            <div>
                <button class="btn" (click)="yes()">确认</button>
                <button class="btn" (click)="no()">取消</button>
            </div>
        </div>
    </div>`,
  styles: [`
    @keyframes message-show {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .layer{
        animation: message-show .3s;
        top: 0;
        z-index:2000;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(50, 50, 50, .02);
    }
    .message {
        position: absolute;
        z-index: 2001;
        box-shadow: 0 0 10px rgba(233, 150, 122, .3);
        width: 80%;
        min-height: 100px;
        border-radius: 3px;
        top: calc(50% - 50px);
        left: 10%;
        background-color: white;
        text-align: center;
        border: 1px solid rgba(233, 150, 122, .3);
    }
    .message > div:first-child {
        margin: 10px 0 20px 0;
        padding-left: 10px;
        text-align: left;
        font-size: 18px;
        font-weight: bold;
        border-bottom: 1px solid rgba(233, 150, 122, .3);
    }
    .message > div:last-child {
        margin: 10px 0 10px 0;
        padding-top: 10px;
        font-size: 14px;
    }
    .message > div:last-child > button {
        padding: 3px 10px;
    }
    .message > div:last-child > button:first-child{
        margin-right:30px;
        background: #f0c14b;
        background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
        border-color: #f7dfa5;
    }`]
})
export class ConfirmComponent {
  // 确认提示
  message: { title: string, body: string };

  // 当用户选择“确认”或“取消”时需要调用的函数
  onChoose: (yesOrNo: boolean) => void;

  // “确认”事件处理方法
  yes(): void {
    this.onChoose(true);
  }

  // “取消”事件处理方法
  no(): void {
    this.onChoose(false);
  }
}
