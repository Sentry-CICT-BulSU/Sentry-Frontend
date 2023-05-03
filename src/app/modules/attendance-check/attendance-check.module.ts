import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartCardColumnComponent } from './chart-card-column/chart-card-column.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceCheckComponent } from './attendance-check.component';
import { AttendanceCheckRoutingModule } from './attendance-check-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AttendanceManagementComponent } from './pages/attendance-management/attendance-management.component';
import { AttendanceMonitoringComponent } from './pages/attendance-monitoring/attendance-monitoring.component';
import { RoomInformationComponent } from './pages/room-information/room-information.component';
import { CheckAttendanceComponent } from './pages/check-attendance/check-attendance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    AttendanceCheckRoutingModule,
    NgApexchartsModule,
    SharedModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [
    AttendanceCheckComponent,
    AttendanceManagementComponent,
    AttendanceMonitoringComponent,
    RoomInformationComponent,
    CheckAttendanceComponent,
    ChartCardColumnComponent,
  ],
})
export class AttendanceCheckModule {}
