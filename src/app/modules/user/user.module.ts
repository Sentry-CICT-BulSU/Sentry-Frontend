import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


import { UserComponent } from './user.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { EditFacultyComponent } from './pages/edit-faculty/edit-faculty.component';
import { DeletedUserComponent } from './pages/deleted-user/deleted-user.component';


@NgModule({
    declarations: [
        UserComponent,
        UserListComponent,
        AddUserComponent,
        EditUserComponent,
        EditFacultyComponent,
        DeletedUserComponent,
    ],


    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule.forRoot(),
        HttpClientModule,
        ReactiveFormsModule
    ],
})

export class UserModule { }


