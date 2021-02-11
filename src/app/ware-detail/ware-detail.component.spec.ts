import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WareDetailComponent } from './ware-detail.component';

describe('WareDetailComponent', () => {
  let component: WareDetailComponent;
  let fixture: ComponentFixture<WareDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WareDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WareDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
