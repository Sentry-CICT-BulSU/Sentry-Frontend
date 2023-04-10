import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  declarations: [AttendanceComponent]
})
export class AttendanceModule { }
