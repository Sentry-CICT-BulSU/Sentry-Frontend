// Importing necessary modules from @angular and other third-party packages
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AddUserRoutingModule } from './add-user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Importing all necessary components
import { AddUserComponent } from './add-user.component';


// Defining the NgModule for the Report feature module
@NgModule({
  declarations: [
    AddUserComponent,
  ],

  // Importing necessary modules to be used in this module
  imports: [
    CommonModule,
    AddUserRoutingModule,
    SharedModule.forRoot(),
    HttpClientModule,
  ],
})

// Exporting the ReportModule class
export class AddUserModule {}
