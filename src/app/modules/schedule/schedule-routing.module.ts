import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScheduleComponent } from './schedule.component';
import { ScheduleListComponent } from './pages/schedule-list/schedule-list.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { SectionListComponent } from './pages/section-list/section-list.component';
import { AddScheduleComponent } from './pages/add-schedule/add-schedule.component';

const routes: Routes = [
  {

    path: '',
    component: ScheduleComponent,
    children: [

        { path: '', redirectTo: 'faculty-list', pathMatch: 'full' },
        { path: 'faculty-list', component: ScheduleListComponent },
        { path: 'room-list', component: RoomListComponent },
        { path: 'section-list', component: SectionListComponent },
        { path: 'add-schedule', component: AddScheduleComponent },
        { path: '**', redirectTo: 'faculty-list', pathMatch: 'full' },
    ],
},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ScheduleRoutingModule {}
