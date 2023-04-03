import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {RoomKeyRoutingModule } from './room-key-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';


import { RoomKeyComponent } from './room-key.component';
import { RoomKeyContentComponent } from './pages/room-key-content/room-key-content.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        RoomKeyComponent,
        RoomKeyContentComponent,
    ],


    imports: [
        CommonModule,
        RoomKeyRoutingModule,
        SharedModule,
        HttpClientModule,
        NgApexchartsModule,
        ReactiveFormsModule
    ],
})

export class RoomKeyModule { }


