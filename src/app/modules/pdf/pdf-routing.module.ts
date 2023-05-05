// Importing necessary modules from @angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PdfComponent } from './pdf.component';

const routes: Routes = [
  {
    path: '',
    component: PdfComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PdfRoutingModule {}
