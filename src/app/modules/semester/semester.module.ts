import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { SemesterComponent } from './semester.component';
import { SemesterRoutingModule } from './semester-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddSemesterComponent } from './pages/add-semester/add-semester.component';
import { SemesterListComponent } from './pages/semester-list/semester-list.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
    declarations: [
        SemesterComponent,
        SemesterListComponent,
        AddSemesterComponent,
    ],


    imports: [
        CommonModule,
        SemesterRoutingModule,
        SharedModule.forRoot(),
        HttpClientModule,
        ReactiveFormsModule,

        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatFormFieldModule,
    ],
})

export class SemesterModule { }



