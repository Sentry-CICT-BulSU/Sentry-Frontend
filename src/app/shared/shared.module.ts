import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveHelperComponent } from './components/responsive-helper/responsive-helper.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ScheduleFacultyComponent } from './components/schedule-faculty-table/schedule-faculty-table.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ScheduleRoomComponent } from './components/schedule-room-table/schedule-room-table.component';
import { ScheduleSectionComponent } from './components/schedule-section-table/schedule-section-table.component';
import { MatIconModule } from '@angular/material/icon';
import { RoomKeysComponent } from './components/room-keys/room-keys.component';
import { AuthInterceptor } from '../core/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CmsTableComponent } from './components/cms-table/cms-table.component';

@NgModule({
    declarations: [
        ResponsiveHelperComponent,
        UserTableComponent,
        ScheduleFacultyComponent,
        ScheduleRoomComponent,
        ScheduleSectionComponent,
        RoomKeysComponent,
        ClickOutsideDirective,
        CmsTableComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,

        // angular material
        MatIconModule,
    ],
    exports: [
        ResponsiveHelperComponent,
        UserTableComponent,
        ClickOutsideDirective,
        ScheduleFacultyComponent,
        ScheduleRoomComponent,
        ScheduleSectionComponent,
        RoomKeysComponent,
        MatIconModule,
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                },
            ],
        };
    }
}
