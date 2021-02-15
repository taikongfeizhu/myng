import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ware } from './ware.model';
import { WareService } from './ware.service';

@Component({
  selector: 'app-ware',
  templateUrl: './ware.component.html',
  styleUrls: ['./ware.component.less']
})
export class WareComponent implements OnInit {
  wares: Array<Ware> | undefined;
  wareName: string;

  constructor(private wareService: WareService, private route: ActivatedRoute) {
    this.wareService = wareService;
    this.wareName = this.route.snapshot.params.wareName;
    // this.wareName = this.route.snapshot.queryParams.wareName;

    this.route.params.subscribe((x) => {
      this.wareName = x.wareName;
      this.getWareList();
    });
  }

  ngOnInit(): void {
    this.getWareList();
  }

  getWareList(): void {
    const serviceResult = this.wareName ? this.wareService.search(this.wareName) : this.wareService.getWareList();
    serviceResult.subscribe((reps) => {
      if (!reps.success){
        console.error(reps.message);
        return;
      }
      this.wares = reps.data;
    });
  }
}
