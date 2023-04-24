import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceCheckComponent } from './attendance-check.component';
import { AttendanceCheckRoutingModule } from './attendance-check-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AttendanceCheckRoutingModule,
    SharedModule.forRoot(),
    HttpClientModule,
  ],
  declarations: [AttendanceCheckComponent]
})
export class AttendanceCheckModule { }
