import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveHelperComponent } from './components/responsive-helper/responsive-helper.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ScheduleFacultyComponent } from './components/schedule-faculty-table/schedule-faculty-table.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ScheduleRoomComponent } from './components/schedule-room-table/schedule-room-table.component';
import { ScheduleSectionComponent } from './components/schedule-section-table/schedule-section-table.component';

// Angular Material
import { MatIconModule } from '@angular/material/icon';



@NgModule({
    declarations: [
        ResponsiveHelperComponent,
        UserTableComponent,
        ScheduleFacultyComponent,
        ScheduleRoomComponent,
        ScheduleSectionComponent,
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
        ScheduleFacultyComponent,
        ScheduleRoomComponent,
        ScheduleSectionComponent,
        MatIconModule
    ],
})
export class SharedModule { }
