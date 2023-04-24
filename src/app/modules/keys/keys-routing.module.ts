import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KeysComponent } from './keys.component';

const routes: Routes = [
  {

    path: '',
    component: KeysComponent,
},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class KeysRoutingModule {}
