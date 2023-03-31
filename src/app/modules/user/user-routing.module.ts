import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';

const routes: Routes = [
  {

    path: '',
    component: UserComponent,
    children: [

        { path: '', redirectTo: 'user-list', pathMatch: 'full' },
        { path: 'user-list', component: UserListComponent },
        { path: 'add-user', component: AddUserComponent },
        { path: '**', redirectTo: 'user-list', pathMatch: 'full' },
    ],
},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UserRoutingModule {}
