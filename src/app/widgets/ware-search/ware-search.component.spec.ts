import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WareSearchComponent } from './ware-search.component';

describe('WareSearchComponent', () => {
  let component: WareSearchComponent;
  let fixture: ComponentFixture<WareSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WareSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WareSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
