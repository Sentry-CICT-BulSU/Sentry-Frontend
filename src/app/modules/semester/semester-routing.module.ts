import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SemesterComponent } from './semester.component';
import { AddSemesterComponent } from './pages/add-semester/add-semester.component';
import { SemesterListComponent } from './pages/semester-list/semester-list.component';

const routes: Routes = [
  {

    path: '',
    component: SemesterComponent,
    children: [

        { path: '', redirectTo: 'semester-list', pathMatch: 'full' },
        { path: 'semester-list', component: SemesterListComponent },
        { path: 'add-semester', component: AddSemesterComponent },
        { path: '**', redirectTo: 'semester-list', pathMatch: 'full' },
    ],
},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SemesterRoutingModule {}
