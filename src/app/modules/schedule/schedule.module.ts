import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


import { ScheduleComponent } from './schedule.component';
import { ScheduleListComponent } from './pages/schedule-list/schedule-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddScheduleComponent } from './pages/add-schedule/add-schedule.component';
import { ScheduleTableComponent } from './pages/schedule-table/schedule-table.component';



@NgModule({
    declarations: [
        ScheduleComponent,
        ScheduleListComponent,
        AddScheduleComponent,
        ScheduleTableComponent,
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


