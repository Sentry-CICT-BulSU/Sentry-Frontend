import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { DeletedUserComponent } from './pages/deleted-user/deleted-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'deleted-user', component: DeletedUserComponent },
      { path: '', redirectTo: 'user-list', pathMatch: 'full' },
      { path: '**', redirectTo: 'user-list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
