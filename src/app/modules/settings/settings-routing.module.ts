import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { PersonalInformationComponent } from './pages/personal-information/personal-information.component';
import { PasswordAndSecurityComponent } from './pages/password-and-security/password-and-security.component';
import { SystemSettingsComponent } from './pages/system-settings/system-settings.component';

const routes: Routes = [
  {

    path: '',
    component: SettingsComponent,
    children: [

        { path: '', redirectTo: 'personal-information', pathMatch: 'full' },
        { path: 'personal-information', component: PersonalInformationComponent },
        { path: 'password-and-security', component: PasswordAndSecurityComponent },
        { path: 'system-settings', component: SystemSettingsComponent },
        { path: '**', redirectTo: 'personal-information', pathMatch: 'full' },
    ],
},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SettingsRoutingModule {}
