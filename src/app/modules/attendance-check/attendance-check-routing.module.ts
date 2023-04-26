import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttendanceCheckComponent } from './attendance-check.component';
import { AttendanceMonitoringComponent } from './pages/attendance-monitoring/attendance-monitoring.component';
import { AttendanceManagementComponent } from './pages/attendance-management/attendance-management.component';
import { RoomInformationComponent } from './pages/room-information/room-information.component';
import { CheckAttendanceComponent } from './pages/check-attendance/check-attendance.component'

const routes: Routes = [
  {

    path: '',
    component: AttendanceCheckComponent,
    children: [

      { path: '', redirectTo: 'attendance-management', pathMatch: 'full' },
      { path: 'attendance-monitoring', component: AttendanceMonitoringComponent },
      { path: 'attendance-management', component: AttendanceManagementComponent },
      { path: 'room-information', component: RoomInformationComponent },
      { path: 'check-attendance', component: CheckAttendanceComponent },
      { path: '**', redirectTo: 'attendance-management', pathMatch: 'full' },

    ],
},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AttendanceCheckRoutingModule {}
