import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomKeyComponent } from './room-key.component';
import { RoomKeyContentComponent } from './pages/room-key-content/room-key-content.component';
import { KeyInfoComponent } from './pages/key-info/key-info.component';

const routes: Routes = [
    {
        path: '',
        component: RoomKeyComponent,
        children: [
            { path: '', component: RoomKeyContentComponent },
            { path: ':id', component: KeyInfoComponent },
            // { path: 'key-info', component: KeyInfoComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoomKeyRoutingModule {}
