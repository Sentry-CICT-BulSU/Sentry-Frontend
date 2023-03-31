import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveHelperComponent } from './components/responsive-helper/responsive-helper.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

// Angular Material
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        ResponsiveHelperComponent,
        UserTableComponent,
        ClickOutsideDirective,
    ],
    imports: [
        CommonModule,

        // angular material
        MatIconModule
    ],
    exports: [
        ResponsiveHelperComponent,
        UserTableComponent,
        ClickOutsideDirective,
        MatIconModule
    ],
})
export class SharedModule { }
