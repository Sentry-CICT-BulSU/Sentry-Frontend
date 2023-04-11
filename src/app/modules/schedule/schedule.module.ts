import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


import { ScheduleComponent } from './schedule.component';
import { ScheduleListComponent } from './pages/schedule-list/schedule-list.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { SectionListComponent } from './pages/section-list/section-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddScheduleComponent } from './pages/add-schedule/add-schedule.component';



@NgModule({
    declarations: [
        ScheduleComponent,
        ScheduleListComponent,
        RoomListComponent,
        SectionListComponent,
        AddScheduleComponent,
    ],


    imports: [
        CommonModule,
        ScheduleRoutingModule,
        SharedModule.forRoot(),
        HttpClientModule,
        ReactiveFormsModule
    ],
})

export class ScheduleModule { }


