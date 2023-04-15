import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartCardColumnComponent } from './chart-card-column/chart-card.-columncomponent';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    SharedModule,
    HttpClientModule,
    NgApexchartsModule,
    AngularSvgIconModule.forRoot(),
  ],
  declarations: [AttendanceComponent,ChartCardColumnComponent,]
})
export class AttendanceModule { }
