import { Component } from '@angular/core';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.less']
})
export class TipComponent {
  private msg: string;

  set message(value: string){
    this.msg = value;
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      this.msg = '';
    }, 1500);
  }

  get message(): string {
    return this.msg;
  }
}
