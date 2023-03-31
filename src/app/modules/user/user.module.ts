import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


import { UserComponent } from './user.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        UserComponent,
        UserListComponent,
        AddUserComponent,
    ],


    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
})

export class UserModule { }


