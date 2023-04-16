import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FacultyComponent } from './faculty.component';
import { FacultyListComponent } from './pages/faculty-list/faculty-list.component';
import { EditFacultyComponent } from './pages/edit-faculty/edit-faculty.component';

const routes: Routes = [
  {

    path: '',
    component: FacultyComponent,
    children: [

        { path: '', redirectTo: 'faculty-list', pathMatch: 'full' },
        { path: 'faculty-list', component: FacultyListComponent },
        { path: 'edit-faculty', component: EditFacultyComponent },
        { path: '**', redirectTo: 'faculty-list', pathMatch: 'full' },
    ],
},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class FacultyRoutingModule {}
