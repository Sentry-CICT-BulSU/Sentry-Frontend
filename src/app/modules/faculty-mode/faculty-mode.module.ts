import { FacultyScheduleComponent } from './pages/faculty-schedule/faculty-schedule.component';
import { FacultyProfileComponent } from './pages/faculty-profile/faculty-profile.component';
import { FacultyModeComponent } from './faculty-mode.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyModeRoutingModule } from './faculty-mode-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FacultyModeRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [
    FacultyModeComponent,
    FacultyProfileComponent,
    FacultyScheduleComponent
  ]
})
export class FacultyModeModule { }
