import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScheduleComponent } from './schedule.component';
import { ScheduleListComponent } from './pages/schedule-list/schedule-list.component';
import { AddScheduleComponent } from './pages/add-schedule/add-schedule.component';

const routes: Routes = [
  {

    path: '',
    component: ScheduleComponent,
    children: [

        { path: '', redirectTo: 'schedule-list', pathMatch: 'full' },
        { path: 'schedule-list', component: ScheduleListComponent },
        { path: 'add-schedule', component: AddScheduleComponent },
        { path: '**', redirectTo: 'schedule-list', pathMatch: 'full' },
    ],
},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ScheduleRoutingModule {}
