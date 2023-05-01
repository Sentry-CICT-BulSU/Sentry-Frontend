import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SectionComponent } from './section.component';
import { AddSectionComponent } from './pages/add-section/add-section.component';
import { SectionListComponent } from './pages/section-list/section-list.component';

const routes: Routes = [
  {

    path: '',
    component: SectionComponent,
    children: [

        { path: '', redirectTo: 'section-list', pathMatch: 'full' },
        { path: 'section-list', component: SectionListComponent },
        { path: 'add-section', component: AddSectionComponent },
        { path: '**', redirectTo: 'section-list', pathMatch: 'full' },
    ],
},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SectionRoutingModule {}
