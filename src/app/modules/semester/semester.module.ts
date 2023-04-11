import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemesterComponent } from './semester.component';
import { SemesterRoutingModule } from './semester-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    SemesterRoutingModule,
    SharedModule.forRoot(),
    HttpClientModule,
  ],
  declarations: [SemesterComponent]
})
export class SemesterModule { }
