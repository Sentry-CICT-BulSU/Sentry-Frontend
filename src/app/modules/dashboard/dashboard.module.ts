// Importing necessary modules from @angular and other third-party packages
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartCardComponent } from './chart-card/chart-card.component';
import { NgApexchartsModule } from 'ng-apexcharts';

// Importing all necessary components
import { DashboardComponent } from './dashboard.component';


// Defining the NgModule for the Dashboard feature module
@NgModule({
  declarations: [
    DashboardComponent,
    ChartCardComponent,
  ],

  // Importing necessary modules to be used in this module
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    HttpClientModule,
    NgApexchartsModule,
    AngularSvgIconModule.forRoot(),
  ],
})

// Exporting the DashboardModule class
export class DashboardModule {}
