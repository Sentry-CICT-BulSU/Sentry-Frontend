import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveHelperComponent } from './components/responsive-helper/responsive-helper.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [ResponsiveHelperComponent, UserTableComponent, ClickOutsideDirective],
  imports: [CommonModule],
  exports: [ResponsiveHelperComponent, UserTableComponent, ClickOutsideDirective],
})
export class SharedModule {}
