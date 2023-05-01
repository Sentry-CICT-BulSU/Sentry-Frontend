import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { SectionComponent } from './section.component';
import { SectionRoutingModule } from './section-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddSectionComponent } from './pages/add-section/add-section.component';
import { SectionListComponent } from './pages/section-list/section-list.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
    declarations: [
        SectionComponent,
        SectionListComponent,
        AddSectionComponent,
    ],


    imports: [
        CommonModule,
        SectionRoutingModule,
        SharedModule,
        HttpClientModule,
        ReactiveFormsModule,

        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatFormFieldModule,
    ],
})

export class SectionModule { }



