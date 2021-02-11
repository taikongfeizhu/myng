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

  ware: Ware | unknown;

  wareCount: number;

  constructor(private wareDetailService: WareDetailService, private route: ActivatedRoute) {
    this.wareCount = 1;
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
