import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ware-search',
  templateUrl: './ware-search.component.html',
  styleUrls: ['./ware-search.component.less']
})
export class WareSearchComponent implements OnInit {
  public wareName: string;

  @Input()
  searchBoxStyle: {
    [key: string]: string
  };

  @Output()
  searchEvt: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) { }

  search(): void {
    if (!this.wareName){
      return;
    }

    this.searchEvt.emit(this.wareName);

    // this.router.navigate(['/ware-search', { queryParams: { wareName: this.wareName }}]);
    this.router.navigate(['/ware-search', { wareName: this.wareName }]);
  }

  ngOnInit(): void {
  }

}
