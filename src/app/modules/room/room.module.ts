import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';
import { RoomRoutingModule } from './room-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { AddRoomComponent } from './pages/add-room/add-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditRoomComponent } from './pages/edit-room/edit-room.component';

@NgModule({
    imports: [
        CommonModule,
        RoomRoutingModule,
        SharedModule.forRoot(),
        HttpClientModule,
        ReactiveFormsModule,
    ],
    declarations: [RoomComponent, RoomListComponent, AddRoomComponent, EditRoomComponent],
})
export class RoomModule {}
