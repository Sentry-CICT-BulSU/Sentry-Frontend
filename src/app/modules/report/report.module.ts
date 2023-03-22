// Importing necessary modules from @angular and other third-party packages
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Importing the ReportRoutingModule, ReportContentComponent, and SharedModule from local files
import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Importing all necessary components
import { ReportComponent } from './report.component';


// Defining the NgModule for the Report feature module
@NgModule({
  declarations: [
    ReportComponent,
  ],

  // Importing necessary modules to be used in this module
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
})

// Exporting the ReportModule class
export class ReportModule {}
