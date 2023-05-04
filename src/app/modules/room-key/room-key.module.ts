import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {RoomKeyRoutingModule } from './room-key-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';


import { RoomKeyComponent } from './room-key.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KeyInfoComponent } from './pages/key-info/key-info.component';
import { RoomKeyContentComponent } from './pages/room-key-content/room-key-content.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
    declarations: [
        RoomKeyComponent,
        RoomKeyContentComponent,
        KeyInfoComponent,
    ],


    imports: [
        CommonModule,
        RoomKeyRoutingModule,
        SharedModule.forRoot(),
        HttpClientModule,
        NgApexchartsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
    ],
})

export class RoomKeyModule { }


