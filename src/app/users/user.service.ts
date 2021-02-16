import { Inject, Injectable } from '@angular/core';

export const API_URL = 'API_URL';

@Injectable()
export class UserService {

  constructor(
    @Inject('API_URL') private url: string
  ) { }

  sayHi(): void{
    console.log('say hi', this.url);
  }
}
