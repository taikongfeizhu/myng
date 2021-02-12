import { Component, OnInit } from '@angular/core';
import { Ware } from '../ware/ware.model';
import {WareDetailService} from './ware-detail.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ware-detail',
  templateUrl: './ware-detail.component.html',
  styleUrls: ['./ware-detail.component.less']
})
export class WareDetailComponent implements OnInit {

  message: string;

  ware: Ware;

  wareCount: number;

  constructor(private wareDetailService: WareDetailService, private route: ActivatedRoute) {
    this.wareCount = 1;
  }

  addToCart(): void {
    this.wareDetailService.addToCart(this.ware.id, this.wareCount).subscribe(resp => {
      this.message = resp.message;
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.message = '';
      }, 1500);
    });
  }

  ngOnInit(): void {
    const waredId: number = this.route.snapshot.params.id;
    this.wareDetailService.getWare(waredId).subscribe(x => {
      if (!x.success){
        console.log(x.message);
        return;
      }
      this.ware = x.data;
    });
  }
}
