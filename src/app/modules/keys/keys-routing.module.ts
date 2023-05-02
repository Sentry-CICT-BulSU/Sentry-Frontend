import { FacultyKeysComponent } from './pages/faculty-keys/faculty-keys.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KeysComponent } from './keys.component';
import { KeysOverviewComponent } from './pages/keys-overview/keys-overview.component';
import { ClassroomKeysComponent } from './pages/classroom-keys/classroom-keys.component';
import { KeyLogsComponent } from './pages/key-logs/key-logs.component';

const routes: Routes = [
  {
    path: '',
    component: KeysComponent,
    children: [
      { path: '', redirectTo: 'keys-overview', pathMatch: 'full' },
      { path: 'keys-overview', component: KeysOverviewComponent },
      { path: 'classroom-keys', component: ClassroomKeysComponent },
      { path: 'key-logs', component: KeyLogsComponent },
      { path: 'faculty-keys', component: FacultyKeysComponent },
      { path: '**', redirectTo: 'keys-overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeysRoutingModule {}
