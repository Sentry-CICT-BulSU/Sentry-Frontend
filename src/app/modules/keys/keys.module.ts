import { FacultyKeysComponent } from './pages/faculty-keys/faculty-keys.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeysComponent } from './keys.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { KeysRoutingModule } from './keys-routing.module';


import { KeysOverviewComponent } from './pages/keys-overview/keys-overview.component';
import { ClassroomKeysComponent } from './pages/classroom-keys/classroom-keys.component';
import { KeyLogsComponent } from './pages/key-logs/key-logs.component';

@NgModule({
  imports: [
    CommonModule,
    KeysRoutingModule,
    SharedModule.forRoot(),
    HttpClientModule,
  ],
  declarations: [
    KeysComponent,
    KeysOverviewComponent,
    ClassroomKeysComponent,
    KeyLogsComponent,
    FacultyKeysComponent
  ]
})
export class KeysModule { }
