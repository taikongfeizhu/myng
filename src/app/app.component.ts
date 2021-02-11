import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'myng';
  petCount = 0;
  pets: Array<Pets>;

  constructor() {
    const petService: AppService = new AppService();
    this.petCount = petService.getPetCount();
    this.pets = petService.getPets();
  }
}
