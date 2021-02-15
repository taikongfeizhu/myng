import { Component, OnInit } from '@angular/core';
import {from, Observable, of} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  constructor() { }

  getData(): void {
    const persons = [
      { name: 'aaa', age: 24, salary: 2000 },
      { name: 'bbb', age: 25, salary: 2100 },
      { name: 'ccc', age: 26, salary: 2200 },
      { name: 'ddd', age: 27, salary: 2300 }
    ];

    const myObservable = from(persons);
    myObservable.subscribe(person => console.log(person));
  }

  ngOnInit(): void {
    console.log('>>> loaded');
  }

}
