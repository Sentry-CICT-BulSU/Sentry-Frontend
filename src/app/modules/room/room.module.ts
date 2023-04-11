import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';
import { RoomRoutingModule } from './room-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RoomRoutingModule,
    SharedModule.forRoot(),
    HttpClientModule,
  ],
  declarations: [RoomComponent]
})
export class RoomModule { }
