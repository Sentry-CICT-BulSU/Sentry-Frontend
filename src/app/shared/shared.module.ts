import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveHelperComponent } from './components/responsive-helper/responsive-helper.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ScheduleFacultyComponent } from './components/schedule-faculty-table/schedule-faculty-table.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ScheduleRoomComponent } from './components/schedule-room-table/schedule-room-table.component';
import { ScheduleSectionComponent } from './components/schedule-section-table/schedule-section-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RoomKeysComponent } from './components/room-keys/room-keys.component';
import { AuthInterceptor } from '../core/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CmsTableComponent } from './components/cms-table/cms-table.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DeletedUserTableComponent } from './components/deleted-user-table/deleted-user-table.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    declarations: [
        ResponsiveHelperComponent,
        UserTableComponent,
        DeletedUserTableComponent,
        ScheduleFacultyComponent,
        ScheduleRoomComponent,
        ScheduleSectionComponent,
        RoomKeysComponent,
        ClickOutsideDirective,
        CmsTableComponent,
        SpinnerComponent,

    ],
    imports: [
        CommonModule,
        RouterModule,
        NgxPaginationModule,
        // angular material
        MatIconModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        ResponsiveHelperComponent,
        UserTableComponent,
        DeletedUserTableComponent,
        ClickOutsideDirective,
        ScheduleFacultyComponent,
        ScheduleRoomComponent,
        ScheduleSectionComponent,
        RoomKeysComponent,
        MatIconModule,
        MatProgressSpinnerModule,
        SpinnerComponent,
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
