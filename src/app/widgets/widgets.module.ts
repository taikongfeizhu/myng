import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WareSearchComponent } from './ware-search/ware-search.component';
import { AuthDirective } from './directives/auth.directive';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [WareSearchComponent, AuthDirective],
  declarations: [WareSearchComponent, AuthDirective],
})
export class WidgetsModule { }
