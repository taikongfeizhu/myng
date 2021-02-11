import { Component, OnInit } from '@angular/core';
import { Ware } from './ware.model';
import { WareService } from './ware.service';

@Component({
  selector: 'app-ware',
  templateUrl: './ware.component.html',
  styleUrls: ['./ware.component.less']
})
export class WareComponent implements OnInit {
  wares: Array<Ware> | undefined;

  constructor(private wareService: WareService) {
    this.wareService = wareService;
  }

  ngOnInit(): void {
    this.wareService.getWareList().subscribe((x) => {
      if (!x.success){
        console.error(x.message);
        return;
      }
      this.wares = x.data;
    });
  }
}
