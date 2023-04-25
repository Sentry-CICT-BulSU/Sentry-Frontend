import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyComponent } from './faculty.component';
import { FacultyRoutingModule } from './faculty-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FacultyListComponent } from './pages/faculty-list/faculty-list.component';
import { EditFacultyComponent } from './pages/edit-faculty/edit-faculty.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FacultyRoutingModule,
    SharedModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [FacultyComponent, FacultyListComponent, EditFacultyComponent],
})
export class FacultyModule {}
