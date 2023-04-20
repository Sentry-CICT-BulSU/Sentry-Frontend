import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalInformationComponent } from './pages/personal-information/personal-information.component';
import { PasswordAndSecurityComponent } from './pages/password-and-security/password-and-security.component';
import { SystemSettingsComponent } from './pages/system-settings/system-settings.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SettingsComponent,
    PersonalInformationComponent,
    PasswordAndSecurityComponent,
    SystemSettingsComponent,
]
})
export class SettingsModule { }
