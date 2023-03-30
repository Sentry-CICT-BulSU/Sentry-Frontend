// Importing necessary modules from @angular and other third-party packages
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Importing all necessary components
import { UserComponent } from './user.component';


// Defining the NgModule for the Report feature module
@NgModule({
  declarations: [
    UserComponent,
  ],

  // Importing necessary modules to be used in this module
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
})

// Exporting the ReportModule class
export class UserModule {}
