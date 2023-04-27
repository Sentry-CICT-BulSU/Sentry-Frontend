import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomComponent } from './room.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { AddRoomComponent } from './pages/add-room/add-room.component';
import { EditRoomComponent } from './pages/edit-room/edit-room.component';

const routes: Routes = [
  {

    path: '',
    component: RoomComponent,
    children: [

        { path: '', redirectTo: 'room-list', pathMatch: 'full' },
        { path: 'room-list', component: RoomListComponent },
        { path: 'add-room', component: AddRoomComponent },
        { path: 'edit-room', component: EditRoomComponent },
        { path: '**', redirectTo: 'room-list', pathMatch: 'full' },
    ],
},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class RoomRoutingModule {}
