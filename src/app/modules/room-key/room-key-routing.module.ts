import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomKeyComponent } from './room-key.component';
import { RoomKeyContentComponent } from './pages/room-key-content/room-key-content.component';

const routes: Routes = [
  {

    path: '',
    component: RoomKeyComponent,
    children: [

        { path: '', redirectTo: 'content', pathMatch: 'full' },
        { path: 'content', component: RoomKeyContentComponent },
        { path: '**', redirectTo: 'content', pathMatch: 'full' },
    ],
},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class RoomKeyRoutingModule {}
