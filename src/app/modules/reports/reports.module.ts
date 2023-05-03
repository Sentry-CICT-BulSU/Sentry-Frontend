import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportsTableComponent } from './pages/reports-table/reports-table.component';

@NgModule({
  declarations: [ReportsComponent, ReportsTableComponent],

  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class ReportsModule {}
