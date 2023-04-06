import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({

    declarations: [
    ReportsComponent,
    ],

  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    HttpClientModule,
  ],

})
export class ReportsModule { }
