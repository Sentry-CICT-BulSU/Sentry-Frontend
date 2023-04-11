import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule.forRoot(),
    HttpClientModule,
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
