import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyComponent } from './faculty.component';
import { FacultyRoutingModule } from './faculty-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FacultyRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  declarations: [FacultyComponent]
})
export class FacultyModule { }
