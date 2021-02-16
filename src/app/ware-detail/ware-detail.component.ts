import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ware } from '../ware/ware.model';
import { WareDetailService } from './ware-detail.service';
import { CartTotalService } from '../../shared/services/cat-total.service';
import { TipService } from '../../shared/services/tip.service';

@Component({
  selector: 'app-ware-detail',
  templateUrl: './ware-detail.component.html',
  styleUrls: ['./ware-detail.component.less']
})
export class WareDetailComponent implements OnInit {

  ware: Ware;

  wareCount: number;

  constructor(
    private wareDetailService: WareDetailService,
    private route: ActivatedRoute,
    private tipService: TipService,
    private cartTotalService: CartTotalService
  ) {
    this.wareCount = 1;
  }

  addToCart(): void {
    this.wareDetailService.addToCart(this.ware.id, this.wareCount).subscribe(resp => {
      this.tipService.tip(resp.message);
      if (resp.success){
        this.cartTotalService.cartTotalSubject.next(resp.data);
      }
    });
  }

  ngOnInit(): void {
    // https://blog.csdn.net/changyinling520/article/details/77856933
    const waredId: number = this.route.snapshot.params.id;
    this.wareDetailService.getWare(waredId).subscribe(x => {
      if (!x.success){
        return;
      }
      this.ware = x.data;
    });
  }
}
