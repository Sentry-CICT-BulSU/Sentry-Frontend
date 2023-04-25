import { FacultyProfileComponent } from './pages/faculty-profile/faculty-profile.component';
import { FacultyModeComponent } from './faculty-mode.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {

    path: '',
    component: FacultyModeComponent,
    children: [
        { path: '', redirectTo: 'faculty-profile', pathMatch: 'full' },
        { path: 'faculty-profile', component: FacultyProfileComponent },
        { path: '**', redirectTo: 'faculty-profile', pathMatch: 'full' },
    ],
},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class FacultyModeRoutingModule {}
