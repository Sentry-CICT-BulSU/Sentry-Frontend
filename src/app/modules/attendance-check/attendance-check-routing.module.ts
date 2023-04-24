import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AttendanceCheckComponent } from './attendance-check.component';

const routes: Routes = [
  {

    path: '',
    component: AttendanceCheckComponent,
},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AttendanceCheckRoutingModule {}
