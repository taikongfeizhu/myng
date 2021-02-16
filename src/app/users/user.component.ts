import {Component, Inject, OnInit} from '@angular/core';
import { UserService, API_URL } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    @Inject(API_URL) private url: string
  ) {}

  ngOnInit(): void {
    this.userService.sayHi();
    console.log(this.url, '>>>>');
  }

}
