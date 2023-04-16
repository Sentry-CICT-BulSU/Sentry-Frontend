import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from './subject.component';
import { SubjectRoutingModule } from './subject-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SubjectListComponent } from './pages/subject-list/subject-list.component';
import { AddSubjectComponent } from './pages/add-subject/add-subject.component';

@NgModule({
  imports: [
    CommonModule,
    SubjectRoutingModule,
    SharedModule.forRoot(),
    HttpClientModule,
  ],
  declarations: [
    SubjectComponent,
    SubjectListComponent,
    AddSubjectComponent,]
})
export class SubjectModule { }
