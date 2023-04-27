import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubjectComponent } from './subject.component';
import { SubjectListComponent } from './pages/subject-list/subject-list.component';
import { AddSubjectComponent } from './pages/add-subject/add-subject.component';
import { EditSubjectComponent } from './pages/edit-subject/edit-subject.component';

const routes: Routes = [
  {

    path: '',
    component: SubjectComponent,
    children: [

        { path: '', redirectTo: 'subject-list', pathMatch: 'full' },
        { path: 'subject-list', component: SubjectListComponent },
        { path: 'add-subject', component: AddSubjectComponent },
        { path: 'edit-subject', component: EditSubjectComponent },
        { path: '**', redirectTo: 'subject-list', pathMatch: 'full' },
    ],
},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SubjectRoutingModule {}
